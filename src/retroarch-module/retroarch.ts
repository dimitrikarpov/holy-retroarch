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

import { downloadModule } from "./downloadModule"
import { configureModule } from "./configureModule"
import { copyFile, DIRS } from "../utils/copyFile"
import { Deferred } from "../utils/Deferred"
import {
  defaultKeybinds,
  extraConfig,
  nulKeys,
  stringifySettings,
} from "./defaultConfig"

export type TCore = "nestopia" | "fceumm"

export interface IRetroarch {
  prepare: (canvas: HTMLCanvasElement, core: TCore) => Promise<void>
  copyConfig: () => void
  copyRom: (rom: Uint8Array) => void
  copySave: (state: Uint8Array) => void
  start: () => void
  loadSave: () => void
  onEmulatorStarted: () => void
}

// const deferredOnRuntimeInitialized = new Deferred()
// const onRuntimeInitialized = () => deferredOnRuntimeInitialized.resolve("")

export class Retroarch {
  core: TCore
  canvas: HTMLCanvasElement
  deferredOnRuntimeInitialized: Deferred

  constructor(core: TCore, canvas: HTMLCanvasElement) {
    this.core = core
    this.canvas = canvas
    this.deferredOnRuntimeInitialized = new Deferred()
  }

  async downloadCore() {
    configureModule(this.canvas, () =>
      this.deferredOnRuntimeInitialized.resolve(""),
    )
    await downloadModule(this.core)
    await this.deferredOnRuntimeInitialized.promise
  }

  copyConfig() {
    copyFile(
      stringifySettings({ ...defaultKeybinds, ...extraConfig, ...nulKeys }),
      DIRS.USERDATA,
      "retroarch.cfg",
    )
  }

  copyRom(rom: Uint8Array) {
    copyFile(rom, DIRS.ROOT, "rom.bin")
  }

  copySave(state: Uint8Array) {
    copyFile(state, DIRS.STATES, "rom.state")
  }

  start() {
    window.Module.callMain(window.Module.arguments)
    window.Module.resumeMainLoop()
    // document.getElementById("canvas").focus()
  }

  loadSave() {
    window.Module._cmd_load_state()
  }

  onEmulatorStarted() {
    console.log("[Retroarch Service]: emulator started")
  }
}

// export const retroarch: IRetroarch = {
//   prepare: async (canvas, core) => {
//     configureModule(canvas, onRuntimeInitialized)
//     await downloadModule(core)
//     await deferredOnRuntimeInitialized.promise
//   },

//   copyConfig: () => {
//     copyFile(
//       stringifySettings({ ...defaultKeybinds, ...extraConfig, ...nulKeys }),
//       DIRS.USERDATA,
//       "retroarch.cfg",
//     )
//   },

//   copyRom: (rom) => {
//     copyFile(rom, DIRS.ROOT, "rom.bin")
//   },

//   copySave: (state) => {
//     copyFile(state, DIRS.STATES, "rom.state")
//   },

//   start: () => {
//     window.Module.callMain(window.Module.arguments)
//     window.Module["resumeMainLoop"]()
//     // document.getElementById("canvas").focus()
//   },

//   loadSave: () => {
//     window.Module._cmd_load_state()
//   },

//   onEmulatorStarted: () => {
//     console.log("[Retroarch Service]: emulator started")
//   },
// }
