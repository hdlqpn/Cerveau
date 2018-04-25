import { Event, events } from "ts-typed-events";
import { BaseClient } from "~/core/clients";
import { IFinishedDeltaData, IGameObjectReference,
    IOrderedDeltaData, IRanDeltaData } from "~/core/game/gamelog-interfaces";
import { serialize, unSerialize } from "~/core/serializer";
import { capitalizeFirstLetter, IAnyObject } from "~/utils";
import { BaseGame } from "./base-game";
import { IBaseGameNamespace } from "./base-game-namespace";
import { BaseGameObject } from "./base-game-object";
import { BaseGameSanitizer } from "./base-game-sanitizer";
import { IBasePlayer } from "./base-player";

/** Represents an order sent to an AI. */
interface IOrder {
    // TODO: This should probably be an id in the future,
    // but clients currently only know the numbered index
    index: number;
    name: string;
    args: any[]; // should be the serialized args
    resolve: (returned: any) => void;
    reject: (err: any) => void;
}

/**
 * Manages the AI that actually plays games, basically a wrapper for public
 * functions so games can't see those and get themselves into deep shit
 */
export class BaseAIManager {
    /** The events this AI (manager) emits */
    public readonly events = events({
        ordered: new Event<IOrderedDeltaData>(),
        finished: new Event<IFinishedDeltaData>(),
        ran: new Event<IRanDeltaData>(),
    });

    /** **This must be set externally before use** */
    public game!: BaseGame;

    /** **This one too** */
    public invalidateRun!: (
        player: IBasePlayer,
        gameObject: BaseGameObject,
        functionName: string,
        args: Map<string, any>,
    ) => string | undefined;

    /** The orders that have been sent to clients */
    private readonly orders = new Map<number, IOrder | undefined>();

    /** The next number to use for an order's index */
    private nextOrderIndex = 0;

    /**
     * Creates an AI Manager for some client('s AI).
     *
     * @param client - The client this is managing the AI for.
     * Must be a player.
     * @param gameSanitizer - The sanitizer instance for this AI's game.
     * @param namespace - The namespace of the game, to get schemas from.
     */
    constructor(
        private readonly client: BaseClient,
        private readonly gameSanitizer: BaseGameSanitizer,
        private readonly namespace: IBaseGameNamespace,
    ) {
        this.client.sent.finished.on((finished) => {
            this.finishedOrder(finished.orderIndex, finished.returned);
        });

        this.client.sent.run.on((run) => {
            this.requestedRun(run.caller, run.functionName, run.args);
        });
    }

    /**
     * Called by AI's to instruct their client to run an order.
     *
     * @param name - The name of the order (function name on client's AI).
     * @param unsanitizedArgs - The args to send to that function.
     * @returns A promise that will resolve when the AI finishes that order
     * resolving to their returned value.
     */
    public executeOrder(name: string, ...unsanitizedArgs: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            const sanitizedArgs = this.gameSanitizer.sanitizeOrderArgs(
                name,
                unsanitizedArgs,
            );

            if (sanitizedArgs instanceof Error) {
                // Then the structure of the order is so bad that we
                // can't figure out what to do
                this.client.disconnect(`We could not make you execute ${name}.`);
                reject(sanitizedArgs);
                return;
            }

            const args = sanitizedArgs.map((a) => serialize(a));
            const index = this.nextOrderIndex++;

            const order: IOrder = {
                index,
                name,
                args,
                // When the client sends back that they resolved this order,
                // we will resolve via this stored resolve callback
                resolve,
                reject,
            };

            // This is basically to notify upstream for the gamelog manager
            // and session to record/send these
            this.events.ordered.emit({
                player: { id: this.client.player!.id },
                order: {
                    name,
                    index,
                    args,
                },
            });

            this.client.send("order", {
                name,
                index,
                args,
            });

            this.orders.set(index, order);

            // Now they have an order, start their timer while they execute it.
            this.client.startTicking();
        });
    }

    /**
     * Invoked when a client requests some game logic be run.
     *
     * @param callerReference - The game object reference of the instance
     * in the game.
     * @param functionName - The name of the function of the caller to invoke.
     * @param unsanitizedArgs - The key/value args for that function.
     * @returns A promise that will eventually resolve to the return value of
     * this run command, or undefined if the command is incomprehensible.
     *
     * NOTE: while game logic runs a delta will probably be sent out.
     */
    private async requestedRun<T>(
        callerReference: IGameObjectReference,
        functionName: string,
        unsanitizedArgs: IAnyObject,
    ): Promise<T | undefined> {
        this.client.pauseTicking();

        const returned = await this.tryToRun<T>(
            callerReference,
            functionName,
            unsanitizedArgs,
        );

        this.client.startTicking();
        return returned;
    }

    /**
     * Attempts to run some game logic
     *
     * @param callerReference - The game object reference of the instance
     * in the game.
     * @param functionName - The name of the function of the caller to invoke.
     * @param unsanitizedArgs - The key/value args for that function.
     * @returns A promise that will eventually resolve to the return value of
     * this run command, or undefined if the command is incomprehensible.
     */
    private async tryToRun<T>(
        callerReference: IGameObjectReference,
        functionName: string,
        unsanitizedArgs: IAnyObject,
    ): Promise<T | undefined> {
        if (!this.client.player) {
            this.client.disconnect(
                "You do not have a Player to send run commands for",
            );
            return undefined;
        }

        const callerID = callerReference && callerReference.id;
        const caller = this.game.gameObjects[callerID];

        if (!caller) {
            this.client.disconnect(`Cannot determine the calling game object of ${callerReference} to run for.`);
            return undefined;
        }

        const sanitizedArgs = this.gameSanitizer.validateRunArgs(
            caller,
            functionName,
            unSerialize(unsanitizedArgs, this.game),
        );

        if (sanitizedArgs instanceof Error) {
            // The structure of their run command is so malformed we can't even
            // run it, so something is wrong with their client, disconnect them
            this.client.disconnect(sanitizedArgs.message);
            return undefined;
        }

        // If we got here, we have sanitized the args and know the calling
        // game object has the appropriate function
        const schema = this.namespace.gameObjectsSchema[caller.gameObjectName].functions[functionName];
        let returned = schema.invalidValue;

        const gameInvalidMessage = this.invalidateRun(
            this.client.player,
            caller,
            functionName,
            sanitizedArgs,
        );

        let invalid: string | undefined;
        // If the game said the run is invalid for all runs
        if (gameInvalidMessage) {
            // Tell the client it is invalid
            this.client.send("invalid", { message: gameInvalidMessage });
        }
        else {
            // else, the game is ok with trying to have
            // the calling game object try to invalidate the run
            const invalidateFunction = (caller as any)[`invalidate${capitalizeFirstLetter(functionName)}`];
            const validated: string | IArguments = invalidateFunction.call(
                caller,
                this.client.player,
                ...sanitizedArgs.values(),
            );

            invalid = typeof validated === "string"
                ? validated
                : undefined;

            if (invalid) {
                // Their arguments did not validate,
                // so they get told it was invalid
                this.client.send("invalid", { message: invalid });
            }
            else {
                // It's valid!
                const unsanitizedReturned: any = await (caller as any)[functionName](...validated);
                returned = this.gameSanitizer.validateRanReturned(caller, functionName, unsanitizedReturned);
            }
        }

        returned = serialize(returned);

        // This is basically to notify upstream for the gamelog manager and
        // session to record/send these
        this.events.ran.emit({
            player: { id: this.client.player.id },
            invalid,
            run: {
                caller: callerReference,
                functionName,
                // store the raw args in the gamelog for better debugging
                args: unsanitizedArgs,
            },
            returned,
        });

        this.client.send("ran", returned);

        return returned;
    }

    /**
     * Invoked by a client when they claim to have finished an order.
     *
     * This should resolve the promised generated in `executeOrder`.
     * @param orderIndex - The index (id) of the order they finished executing.
     * @param unsanitizedReturned - The value they returned from executing
     * that order.
     */
    private finishedOrder(orderIndex: number, unsanitizedReturned: any): void {
        const order = this.orders.get(orderIndex);
        if (!order) {
            this.client.disconnect(`Cannot find order # ${orderIndex} you claim to have finished.`);
            return; // we have no order to resolve or reject
        }

        this.orders.delete(orderIndex);

        if (this.orders.size === 0) {
            // No orders remaining, stop their timer as we are not waiting on
            // them for anything
            this.client.pauseTicking();
        }

        const validated = this.gameSanitizer.validateFinishedReturned(
            order.name,
            unSerialize(unsanitizedReturned, this.game),
        );

        let invalid: Error | undefined;
        if (validated instanceof Error) {
            invalid = validated;
            this.client.disconnect(`Return value of ${unsanitizedReturned} could not be validated.`);
        }

        // This is basically to notify upstream for the gamelog manager and
        // session to record/send these
        this.events.finished.emit({
            player: { id: this.client.player!.id },
            invalid: invalid && invalid.message,
            order,
            returned: unsanitizedReturned,
        });

        if (invalid) {
            order.reject(invalid);
        }
        else {
            order.resolve(validated);
        }
    }
}
