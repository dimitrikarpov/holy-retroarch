import { ModuleService } from "./retroarch-module/moduleService"

const createCanvas = (container) => {
  const canvas = document.createElement("canvas")
  canvas.setAttribute("id", "canvas")
  container.appendChild(canvas)

  return canvas
}

export const createEmulator = (container = document.body) => {
  const canvas = createCanvas(container)

  //   const canvas = document.getElementById("canvas")

  ModuleService.prepare(canvas)

  console.log({ canvas })
}
