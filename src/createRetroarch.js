import { RetroarchService } from "./retroarch-module/RetroarchService"
import { waitMs } from "./utils/waitMs"

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
  savefile,
  onStarted,
}) => {
  if (onStarted) {
    RetroarchService.onEmulatorStarted = onStarted
  }

  const canvas = createCanvas(container)

  await RetroarchService.prepare(canvas)

  if (rom) {
    RetroarchService.uploadRom(rom)
    await waitMs(250)
    RetroarchService.start()
  }

  return RetroarchService
}
