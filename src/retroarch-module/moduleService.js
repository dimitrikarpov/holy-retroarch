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

export class ModuleService {
  static prepare(canvas) {
    console.log({ canvas })
  }

  static uploadSave(savefile) {} // public or it should goes through the props

  static uploadRom(romfile) {} // public or it should goes through the props

  static start() {} // public or if props with rom and save where available - starts automatically
}

// prepare module
// download script
// copy config file
// copy bundle
// wait for rom uploaded
// wait for save file uploaded
// wait for start (should start if rom or rom+save uploaded)
