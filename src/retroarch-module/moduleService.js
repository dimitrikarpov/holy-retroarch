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
 * - next we have to copy our rom file, retroarch config file and retroarch frontend assets to our retroarch filesystem.
 *   retroarch will start it by calling `onRuntimeInitialized` hook
 * - and we ready to start the Module!
 */

import { Deferred } from "../utils/Deferred"
import { configureModule } from "./configureModule"
import { copyConfig } from "./copyConfig"
import { copyRom } from "./copyRom"
import { downloadAssets } from "./downloadAssets"
import { downloadModule } from "./downloadModule"
import { getDownloadUrl } from "./getDownloadUrl"

const deferredOnRuntimeInitialized = new Deferred()
const onRuntimeInitialized = () => deferredOnRuntimeInitialized.resolve()

export class ModuleService {
  static async prepare(canvas) {
    configureModule(canvas, onRuntimeInitialized)
    await downloadModule(getDownloadUrl("core", "nestopia_libretro.js"))
    await deferredOnRuntimeInitialized.promise
    await downloadAssets()
    copyConfig()
  }

  static uploadSave(savefile) {}

  static uploadRom(romfile) {
    copyRom(romfile)
  }

  static start() {
    window.Module.callMain(window.Module.arguments)
  }
}
