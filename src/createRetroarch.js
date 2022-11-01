import { ModuleService } from "./retroarch-module/moduleService"

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

export const createRetroarch = async (container, rom, savefile) => {
  const canvas = createCanvas(container)

  await ModuleService.prepare(canvas)

  if (rom) {
    ModuleService.uploadRom(rom)
    ModuleService.start()
  }
}
