/**
 * Module - is js part of instance of libretro core + retroarch frontend
 * Module is avaiable as global variable `Module` also it expose `FS` and `RA` objects
 * Module contains js glue for compiled wasm file and some exported functions from retroarch itself
 * FS used for accessing filesystem of wasm module, we will use it to upload rom and retroarch assets (so called bundle)
 * RA will be used for accessing to audio
 *
 *
 * How the module going to be created:
 * - first of all we need to create global object `Module` with some configuration
 *   and initialization hooks
 * - next we download compiled js script of needed core and wasm file. js script
 *   checks if where Module instance in global scope and hooks up our config and extends it.
 *   after that full Module object going to be available and global FS object too.
 * - next we have to copy our rom file and retroarch config file to our retroarch filesystem.
 *   retroarch will start it by calling `onRuntimeInitialized` hook or we can copy directly to wasm filesystem
 * - and we ready to start the Module!
 */
import { TSettings } from "./defaultConfig";
import { CoreManager, TCore } from "./CoreManager";
export declare class Retroarch {
    manager: CoreManager;
    constructor(core: TCore, canvas: HTMLCanvasElement);
    init(): Promise<void>;
    copyConfig(settings?: TSettings): void;
    copyRom(rom: Uint8Array): void;
    copySave(state: Uint8Array): void;
    start(): void;
    loadSave(): void;
}
