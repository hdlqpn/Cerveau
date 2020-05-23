// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.

// tslint:disable:max-classes-per-file
// ^ because we need to build a bunch of base class wrappers here

// base game classes
import {
    BaseAI,
    BaseGame,
    BaseGameManager,
    BaseGameObject,
    BaseGameObjectFactory,
    BaseGameSettingsManager,
    BasePlayer,
    makeNamespace,
} from "~/core/game";

// mixins
import { TwoPlayerPlayer, mixTwoPlayer } from "~/core/game/mixins";

/**
 * The interface that the Player for the Chess game
 * must implement from mixed in game logic.
 */
export interface BaseChessPlayer extends BasePlayer, TwoPlayerPlayer {}

const base0 = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettingsManager,
};

const base1 = mixTwoPlayer(base0);

const mixed = base1;

/** The base AI class for the Chess game will mixin logic. */
class BaseChessAI extends mixed.AI {}

/** The base Game class for the Chess game will mixin logic. */
class BaseChessGame extends mixed.Game {}

/** The base GameManager class for the Chess game will mixin logic. */
class BaseChessGameManager extends mixed.GameManager {}

/** The base GameObject class for the Chess game will mixin logic. */
class BaseChessGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Chess game will mixin logic. */
class BaseChessGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseChessAI,
    Game: BaseChessGame,
    GameManager: BaseChessGameManager,
    GameObject: BaseChessGameObject,
    GameSettings: BaseChessGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for GameObject instances. */
export interface GameObjectProperties {}

/** All the possible properties for Player instances. */
export interface PlayerProperties {
    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * The color (side) of this player. Either 'white' or 'black', with the
     * 'white' player having the first move.
     */
    color?: "black" | "white";

    /**
     * If the player lost the game or not.
     */
    lost?: boolean;

    /**
     * The name of the player.
     */
    name?: string;

    /**
     * This player's opponent in the game.
     */
    opponent?: Player;

    /**
     * The reason why the player lost the game.
     */
    reasonLost?: string;

    /**
     * The reason why the player won the game.
     */
    reasonWon?: string;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;
}

export * from "./game-object";
export * from "./player";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { GameObject } from "./game-object";
import { Player } from "./player";

import { AI } from "./ai";
import { ChessGame } from "./game";
import { ChessGameManager } from "./game-manager";
import { ChessGameSettingsManager } from "./game-settings";

/**
 * The factory that **must** be used to create any game objects in
 * the Chess game.
 */
export class ChessGameObjectFactory extends BaseGameObjectFactory {}

/**
 * The shared namespace for Chess that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: ChessGame,
    GameManager: ChessGameManager,
    GameObjectFactory: ChessGameObjectFactory,
    GameSettingsManager: ChessGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Chess",
    gameSettingsManager: new ChessGameSettingsManager(),
    gameObjectsSchema: {
        AI: {
            attributes: {},
            functions: {
                makeMove: {
                    args: [],
                    returns: {
                        typeName: "string",
                    },
                },
            },
        },
        Game: {
            attributes: {
                fen: {
                    typeName: "string",
                },
                gameObjects: {
                    typeName: "dictionary",
                    keyType: {
                        typeName: "string",
                    },
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: GameObject,
                        nullable: false,
                    },
                },
                history: {
                    typeName: "list",
                    valueType: {
                        typeName: "string",
                    },
                },
                players: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Player,
                        nullable: false,
                    },
                },
                session: {
                    typeName: "string",
                },
            },
            functions: {},
        },
        GameObject: {
            attributes: {
                gameObjectName: {
                    typeName: "string",
                },
                id: {
                    typeName: "string",
                },
                logs: {
                    typeName: "list",
                    valueType: {
                        typeName: "string",
                    },
                },
            },
            functions: {
                log: {
                    args: [
                        {
                            argName: "message",
                            typeName: "string",
                        },
                    ],
                    returns: {
                        typeName: "void",
                    },
                },
            },
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                clientType: {
                    typeName: "string",
                },
                color: {
                    typeName: "string",
                    defaultValue: "black",
                    literals: ["black", "white"],
                },
                lost: {
                    typeName: "boolean",
                },
                name: {
                    typeName: "string",
                },
                opponent: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                reasonLost: {
                    typeName: "string",
                },
                reasonWon: {
                    typeName: "string",
                },
                timeRemaining: {
                    typeName: "float",
                },
                won: {
                    typeName: "boolean",
                },
            },
            functions: {},
        },
    },
    gameVersion:
        "cfa5f5c1685087ce2899229c04c26e39f231e897ecc8fe036b44bc22103ef801",
});
