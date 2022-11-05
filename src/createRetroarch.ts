import { retroarch, TCore } from "./retroarch-module/retroarch"
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
    retroarch.onEmulatorStarted = onStarted
  }

  const canvas = createCanvas(container)

  await retroarch.prepare(canvas, core)

  if (rom && save) {
    retroarch.uploadRom(rom)
    retroarch.uploadSave(save)
    await waitMs(250)
    retroarch.start()
  } else if (rom) {
    retroarch.uploadRom(rom)
    await waitMs(250)
    retroarch.start()
  }

  return retroarch
}
