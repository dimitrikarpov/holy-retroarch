import { Retroarch, TCore } from "./retroarch-module/retroarch"

export type TCreateRetroarchOptions = {
  core: TCore
  rom?: Uint8Array
  container?: HTMLElement
  save?: Uint8Array
  onStarted?: () => void
}

const templateString = `<canvas id="canvas"></canvas>`

const createCanvas = () => {
  let container = document.createElement("div")
  document.body.appendChild(container)
  container.innerHTML = templateString

  const canvas = container.querySelector("canvas")

  return canvas
}

export const createRetroarch = async ({
  core,
  rom,
  save,
}: TCreateRetroarchOptions) => {
  const canvas = createCanvas()

  const retroarch = new Retroarch(core, canvas)

  await retroarch.init()
  retroarch.copyConfig()

  if (rom) retroarch.copyRom(rom)
  if (save) retroarch.copySave(save)

  return retroarch
}
