import { TCore } from "./retroarch-module/CoreManager"
import { Retroarch } from "./retroarch-module/Retroarch"

export type TCreateRetroarchOptions = {
  core: TCore
  rom?: Uint8Array
  save?: Uint8Array
  canvas?: HTMLCanvasElement
  container?: HTMLDivElement
}

const templateString = `<canvas id="canvas"></canvas>`

const createCanvas = (parent: HTMLDivElement = undefined) => {
  let root: HTMLDivElement

  if (parent) {
    root = parent
  } else {
    root = document.createElement("div")
    document.body.appendChild(root)
  }

  root.innerHTML = templateString

  return root.querySelector("canvas")
}

export const createRetroarch = async ({
  core,
  rom,
  save,
  canvas,
  container,
}: TCreateRetroarchOptions) => {
  const retroarch = new Retroarch(core, canvas || createCanvas(container))

  await retroarch.init()
  retroarch.copyConfig()

  if (rom) retroarch.copyRom(rom)
  if (save) retroarch.copySave(save)

  return retroarch
}
