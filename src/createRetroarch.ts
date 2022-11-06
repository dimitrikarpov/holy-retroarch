import { retroarch, TCore } from "./retroarch-module/retroarch"

export type TCreateRetroarchOptions = {
  core: TCore
  rom?: Uint8Array
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
  core,
  container,
  rom,
  save,
  onStarted,
}: TCreateRetroarchOptions) => {
  if (onStarted) {
    retroarch.onEmulatorStarted = onStarted
  }

  const canvas = createCanvas(container)

  await retroarch.prepare(canvas, core)

  retroarch.copyConfig()

  if (rom) retroarch.copyRom(rom)
  if (save) retroarch.copySave(save)

  return retroarch
}
