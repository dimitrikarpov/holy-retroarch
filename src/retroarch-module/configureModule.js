import { moduleLogger } from "./moduleLogger"

const { print, printErr } = moduleLogger()

export const configureModule = (canvas, onRuntimeInitialized) => {
  window.Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized,
    print,
    printErr,
    preRun: [],
    postRun: [],
  }
}
