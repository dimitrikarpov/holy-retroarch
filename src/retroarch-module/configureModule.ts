import { moduleLogger } from "./moduleLogger"

const { print, printErr } = moduleLogger()

export const configureModule = (
  canvas: HTMLCanvasElement,
  onRuntimeInitialized: () => void,
) => {
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
