import { moduleLogger } from "./moduleLogger"

const { print, printErr } = moduleLogger()

export const configureModule = (canvas, onRuntimeInitialized) => {
  const Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized,
    print,
    printErr,
    preRun: [],
    postRun: [],
  }

  window.Module = Module
}
