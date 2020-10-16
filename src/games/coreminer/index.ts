// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.

/* eslint-disable @typescript-eslint/no-empty-interface */

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
import {
    TiledPlayer,
    TurnBasedPlayer,
    TwoPlayerPlayer,
    mixTiled,
    mixTurnBased,
    mixTwoPlayer,
} from "~/core/game/mixins";

// extract game object constructor args
import { FirstArgumentFromConstructor } from "~/utils";

/**
 * The interface that the Player for the Coreminer game
 * must implement from mixed in game logic.
 */
export interface BaseCoreminerPlayer
    extends BasePlayer,
        TwoPlayerPlayer,
        TurnBasedPlayer,
        TiledPlayer {}

const base0 = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettingsManager,
};

const base1 = mixTwoPlayer(base0);
const base2 = mixTurnBased(base1);
const base3 = mixTiled(base2);

const mixed = base3;

/** The base AI class for the Coreminer game will mixin logic. */
class BaseCoreminerAI extends mixed.AI {}

/** The base Game class for the Coreminer game will mixin logic. */
class BaseCoreminerGame extends mixed.Game {}

/** The base GameManager class for the Coreminer game will mixin logic. */
class BaseCoreminerGameManager extends mixed.GameManager {}

/** The base GameObject class for the Coreminer game will mixin logic. */
class BaseCoreminerGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Coreminer game will mixin logic. */
class BaseCoreminerGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseCoreminerAI,
    Game: BaseCoreminerGame,
    GameManager: BaseCoreminerGameManager,
    GameObject: BaseCoreminerGameObject,
    GameSettings: BaseCoreminerGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for Bomb instances. */
export interface BombProperties {
    /**
     * The number of turns before this Bomb explodes. Zero means it will
     * explode after the current turn.
     */
    timer?: number;
}

/** All the possible properties for GameObject instances. */
export interface GameObjectProperties {}

/** All the possible properties for Miner instances. */
export interface MinerProperties {
    /**
     * The number of bombs being carried by this Miner.
     */
    bombs?: number;

    /**
     * The number of building materials carried by this Miner.
     */
    buildingMaterials?: number;

    /**
     * The amount of dirt carried by this Miner.
     */
    dirt?: number;

    /**
     * The remaining health of this Miner.
     */
    health?: number;

    /**
     * The remaining mining power this Miner has this turn.
     */
    miningPower?: number;

    /**
     * The number of moves this Miner has left this turn.
     */
    moves?: number;

    /**
     * The amount of ore carried by this Miner.
     */
    ore?: number;

    /**
     * The Player that owns and can control this Miner.
     */
    owner?: Player;

    /**
     * The Tile this Miner is on.
     */
    tile?: Tile;

    /**
     * The Upgrade this Miner is on.
     */
    upgrade?: Upgrade;

    /**
     * The upgrade level of this Miner. Starts at 0.
     */
    upgradeLevel?: number;
}

/**
 * Argument overrides for Miner's build function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerBuildArgs {
    /**
     * The Tile to build on.
     */
    tile?: Tile;
    /**
     * The structure to build (support, ladder, or shield).
     */
    type?: "support" | "ladder" | "shield";
}

/**
 * Argument overrides for Miner's buy function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used in
 * the actual function.
 */
export interface MinerBuyArgs {
    /**
     * The type of resource to buy.
     */
    resource?: "dirt" | "ore" | "bomb" | "buildingMaterials";
    /**
     * The amount of resource to buy. Amounts <= 0 will buy all of that
     * material Player can.
     */
    amount?: number;
}

/**
 * Argument overrides for Miner's dump function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerDumpArgs {
    /**
     * The Tile the materials will be dumped on.
     */
    tile?: Tile;
    /**
     * The material the Miner will drop. 'dirt', 'ore', or 'bomb'.
     */
    material?: "dirt" | "ore" | "bomb";
    /**
     * The number of materials to drop. Amounts <= 0 will drop all of the
     * material.
     */
    amount?: number;
}

/**
 * Argument overrides for Miner's mine function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerMineArgs {
    /**
     * The Tile the materials will be mined from.
     */
    tile?: Tile;
    /**
     * The amount of material to mine up. Amounts <= 0 will mine all the
     * materials that the Miner can.
     */
    amount?: number;
}

/**
 * Argument overrides for Miner's move function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerMoveArgs {
    /**
     * The Tile this Miner should move to.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Miner's transfer function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerTransferArgs {
    /**
     * The Miner to transfer materials to.
     */
    miner?: Miner;
    /**
     * The type of resource to transfer.
     */
    resource?: "dirt" | "ore" | "bomb" | "buildingMaterials";
    /**
     * The amount of resource to transfer. Amounts <= 0 will transfer all the
     * of the material.
     */
    amount?: number;
}

/**
 * Argument overrides for Miner's upgrade function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface MinerUpgradeArgs {}

/** All the possible properties for Player instances. */
export interface PlayerProperties {
    /**
     * The Tile this Player's base is on.
     */
    baseTile?: Tile;

    /**
     * Every Bomb owned by this Player.
     */
    bombs?: Bomb[];

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * The Tiles this Player's hoppers are on.
     */
    hopperTiles?: Tile[];

    /**
     * If the player lost the game or not.
     */
    lost?: boolean;

    /**
     * Every Miner owned by this Player.
     */
    miners?: Miner[];

    /**
     * The amount of money this Player currently has.
     */
    money?: number;

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
     * The amount of value (victory points) this Player has gained.
     */
    value?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;
}

/**
 * Argument overrides for Player's spawnMiner function. If you return an object
 * of this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface PlayerSpawnMinerArgs {}

/** All the possible properties for Tile instances. */
export interface TileProperties {
    /**
     * An array of Bombs on this Tile.
     */
    bombs?: Bomb[];

    /**
     * The amount of dirt on this Tile.
     */
    dirt?: number;

    /**
     * Whether or not the Tile is a base Tile.
     */
    isBase?: boolean;

    /**
     * Whether or not this Tile is about to fall after this turn.
     */
    isFalling?: boolean;

    /**
     * Whether or not a hopper is on this Tile.
     */
    isHopper?: boolean;

    /**
     * Whether or not a ladder is built on this Tile.
     */
    isLadder?: boolean;

    /**
     * Whether or not a support is built on this Tile.
     */
    isSupport?: boolean;

    /**
     * An array of the Miners on this Tile.
     */
    miners?: Miner[];

    /**
     * The amount of ore on this Tile.
     */
    ore?: number;

    /**
     * The owner of this Tile, or undefined if owned by no-one.
     */
    owner?: Player;

    /**
     * The amount of shielding on this Tile.
     */
    shielding?: number;

    /**
     * The Tile to the 'East' of this one (x+1, y). Undefined if out of bounds
     * of the map.
     */
    tileEast?: Tile;

    /**
     * The Tile to the 'North' of this one (x, y-1). Undefined if out of bounds
     * of the map.
     */
    tileNorth?: Tile;

    /**
     * The Tile to the 'South' of this one (x, y+1). Undefined if out of bounds
     * of the map.
     */
    tileSouth?: Tile;

    /**
     * The Tile to the 'West' of this one (x-1, y). Undefined if out of bounds
     * of the map.
     */
    tileWest?: Tile;

    /**
     * The x (horizontal) position of this Tile.
     */
    x?: number;

    /**
     * The y (vertical) position of this Tile.
     */
    y?: number;
}

/** All the possible properties for Upgrade instances. */
export interface UpgradeProperties {
    /**
     * The amount of cargo capacity this Upgrade has.
     */
    cargoCapacity?: number;

    /**
     * The maximum amount of health this Upgrade has.
     */
    health?: number;

    /**
     * The amount of mining power this Upgrade has per turn.
     */
    miningPower?: number;

    /**
     * The number of moves this Upgrade can make per turn.
     */
    moves?: number;

    /**
     * The Upgrade title.
     */
    title?: string;
}

/**
 * The default args passed to a constructor function for class
 * instances of Bomb.
 */
export type BombConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<BombProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of GameObject.
 */
export type GameObjectConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<GameObjectProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Miner.
 */
export type MinerConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<MinerProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Player.
 */
export type PlayerConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<BaseCoreminerPlayer & PlayerProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Tile.
 */
export type TileConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<TileProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Upgrade.
 */
export type UpgradeConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<UpgradeProperties & T>;

export * from "./bomb";
export * from "./game-object";
export * from "./miner";
export * from "./player";
export * from "./tile";
export * from "./upgrade";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { Bomb } from "./bomb";
import { GameObject } from "./game-object";
import { Miner } from "./miner";
import { Player } from "./player";
import { Tile } from "./tile";
import { Upgrade } from "./upgrade";

import { AI } from "./ai";
import { CoreminerGame } from "./game";
import { CoreminerGameManager } from "./game-manager";
import { CoreminerGameSettingsManager } from "./game-settings";

/** The arguments used to construct a Bomb. */
export type BombArgs = FirstArgumentFromConstructor<typeof Bomb>;

/** The arguments used to construct a Miner. */
export type MinerArgs = FirstArgumentFromConstructor<typeof Miner>;

/** The arguments used to construct a Tile. */
export type TileArgs = FirstArgumentFromConstructor<typeof Tile>;

/** The arguments used to construct a Upgrade. */
export type UpgradeArgs = FirstArgumentFromConstructor<typeof Upgrade>;

/**
 * The factory that **must** be used to create any game objects in
 * the Coreminer game.
 */
export class CoreminerGameObjectFactory extends BaseGameObjectFactory {
    /**
     * Creates a new Bomb in the Game and tracks it for all players.
     *
     * @param args - Data about the Bomb to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Bomb hooked up in the game and ready for you to use.
     */
    public bomb<T extends BombArgs>(args: Readonly<T>): Bomb & T {
        return this.createGameObject("Bomb", Bomb, args);
    }

    /**
     * Creates a new Miner in the Game and tracks it for all players.
     *
     * @param args - Data about the Miner to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Miner hooked up in the game and ready for you to use.
     */
    public miner<T extends MinerArgs>(args: Readonly<T>): Miner & T {
        return this.createGameObject("Miner", Miner, args);
    }

    /**
     * Creates a new Tile in the Game and tracks it for all players.
     *
     * @param args - Data about the Tile to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Tile hooked up in the game and ready for you to use.
     */
    public tile<T extends TileArgs>(args: Readonly<T>): Tile & T {
        return this.createGameObject("Tile", Tile, args);
    }

    /**
     * Creates a new Upgrade in the Game and tracks it for all players.
     *
     * @param args - Data about the Upgrade to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Upgrade hooked up in the game and ready for you to use.
     */
    public upgrade<T extends UpgradeArgs>(args: Readonly<T>): Upgrade & T {
        return this.createGameObject("Upgrade", Upgrade, args);
    }
}

/**
 * The shared namespace for Coreminer that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: CoreminerGame,
    GameManager: CoreminerGameManager,
    GameObjectFactory: CoreminerGameObjectFactory,
    GameSettingsManager: CoreminerGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Coreminer",
    gameSettingsManager: new CoreminerGameSettingsManager(),
    gameObjectsSchema: {
        AI: {
            attributes: {},
            functions: {
                runTurn: {
                    args: [],
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Game: {
            attributes: {
                bombPrice: {
                    typeName: "int",
                },
                bombSize: {
                    typeName: "int",
                },
                bombs: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Bomb,
                        nullable: false,
                    },
                },
                buildingMaterialPrice: {
                    typeName: "int",
                },
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                currentTurn: {
                    typeName: "int",
                },
                dirtPrice: {
                    typeName: "int",
                },
                fallDamage: {
                    typeName: "int",
                },
                fallWeightDamage: {
                    typeName: "int",
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
                ladderCost: {
                    typeName: "int",
                },
                ladderHealth: {
                    typeName: "int",
                },
                largeCargoSize: {
                    typeName: "int",
                },
                largeMaterialSize: {
                    typeName: "int",
                },
                mapHeight: {
                    typeName: "int",
                },
                mapWidth: {
                    typeName: "int",
                },
                maxShielding: {
                    typeName: "int",
                },
                maxTurns: {
                    typeName: "int",
                },
                maxUpgradeLevel: {
                    typeName: "int",
                },
                miners: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Miner,
                        nullable: false,
                    },
                },
                orePrice: {
                    typeName: "int",
                },
                oreValue: {
                    typeName: "int",
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
                shieldCost: {
                    typeName: "int",
                },
                shieldHealth: {
                    typeName: "int",
                },
                spawnPrice: {
                    typeName: "int",
                },
                suffocationDamage: {
                    typeName: "int",
                },
                suffocationWeightDamage: {
                    typeName: "int",
                },
                supportCost: {
                    typeName: "int",
                },
                supportHealth: {
                    typeName: "int",
                },
                tiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                timeAddedPerTurn: {
                    typeName: "int",
                },
                upgradePrice: {
                    typeName: "int",
                },
                upgrades: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Upgrade,
                        nullable: false,
                    },
                },
                victoryAmount: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Bomb: {
            parentClassName: "GameObject",
            attributes: {
                timer: {
                    typeName: "int",
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
        Miner: {
            parentClassName: "GameObject",
            attributes: {
                bombs: {
                    typeName: "int",
                },
                buildingMaterials: {
                    typeName: "int",
                },
                dirt: {
                    typeName: "int",
                },
                health: {
                    typeName: "int",
                },
                miningPower: {
                    typeName: "int",
                },
                moves: {
                    typeName: "int",
                },
                ore: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                upgrade: {
                    typeName: "gameObject",
                    gameObjectClass: Upgrade,
                    nullable: false,
                },
                upgradeLevel: {
                    typeName: "int",
                },
            },
            functions: {
                build: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "type",
                            typeName: "string",
                            defaultValue: "support",
                            literals: ["support", "ladder", "shield"],
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                buy: {
                    args: [
                        {
                            argName: "resource",
                            typeName: "string",
                            defaultValue: "dirt",
                            literals: [
                                "dirt",
                                "ore",
                                "bomb",
                                "buildingMaterials",
                            ],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                dump: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "material",
                            typeName: "string",
                            defaultValue: "dirt",
                            literals: ["dirt", "ore", "bomb"],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                mine: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                move: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                transfer: {
                    args: [
                        {
                            argName: "miner",
                            typeName: "gameObject",
                            gameObjectClass: Miner,
                            nullable: false,
                        },
                        {
                            argName: "resource",
                            typeName: "string",
                            defaultValue: "dirt",
                            literals: [
                                "dirt",
                                "ore",
                                "bomb",
                                "buildingMaterials",
                            ],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                upgrade: {
                    args: [],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                baseTile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: false,
                },
                bombs: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Bomb,
                        nullable: false,
                    },
                },
                clientType: {
                    typeName: "string",
                },
                hopperTiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                lost: {
                    typeName: "boolean",
                },
                miners: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Miner,
                        nullable: false,
                    },
                },
                money: {
                    typeName: "int",
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
                value: {
                    typeName: "int",
                },
                won: {
                    typeName: "boolean",
                },
            },
            functions: {
                spawnMiner: {
                    args: [],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Tile: {
            parentClassName: "GameObject",
            attributes: {
                bombs: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Bomb,
                        nullable: false,
                    },
                },
                dirt: {
                    typeName: "int",
                },
                isBase: {
                    typeName: "boolean",
                },
                isFalling: {
                    typeName: "boolean",
                },
                isHopper: {
                    typeName: "boolean",
                },
                isLadder: {
                    typeName: "boolean",
                },
                isSupport: {
                    typeName: "boolean",
                },
                miners: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Miner,
                        nullable: false,
                    },
                },
                ore: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: true,
                },
                shielding: {
                    typeName: "int",
                },
                tileEast: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileNorth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileSouth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileWest: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                x: {
                    typeName: "int",
                },
                y: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Upgrade: {
            parentClassName: "GameObject",
            attributes: {
                cargoCapacity: {
                    typeName: "int",
                },
                health: {
                    typeName: "int",
                },
                miningPower: {
                    typeName: "int",
                },
                moves: {
                    typeName: "int",
                },
                title: {
                    typeName: "string",
                },
            },
            functions: {},
        },
    },
    gameVersion:
        "3418447660e65ea28b97e2a74d8d95ebd694f36bbb0b6f4bd8d43fc97a3ecd9e",
});
