import { RetroarchService, TCore } from "./retroarch-module/RetroarchService"
import { waitMs } from "./utils/waitMs"

export type TCreateRetroarchOptions = {
  core: TCore
  rom: Uint8Array
  container?: HTMLElement
  save?: Uint8Array
  onStarted?: () => void
}

const templateString = `<canvas id="canvas"></canvas>`

const createCanvas = (container) => {
  let parentContainer = container
  if (!container) {
    parentContainer = document.createElement("div")
    document.body.appendChild(parentContainer)
  }

  parentContainer.innerHTML = templateString

  const canvas = parentContainer.querySelector("canvas")

  return canvas
}

export const createRetroarch = async ({
  container,
  rom,
  save,
  onStarted,
  core,
}: TCreateRetroarchOptions) => {
  if (onStarted) {
    RetroarchService.onEmulatorStarted = onStarted
  }

  const canvas = createCanvas(container)

  await RetroarchService.prepare(canvas, core)

  if (rom && save) {
    RetroarchService.uploadRom(rom)
    RetroarchService.uploadSave(save)
    await waitMs(250)
    RetroarchService.start()
  } else if (rom) {
    RetroarchService.uploadRom(rom)
    await waitMs(250)
    RetroarchService.start()
  }

  return RetroarchService
}
