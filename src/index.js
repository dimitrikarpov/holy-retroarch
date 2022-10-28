import { importModule } from "./importModule.js"
import { init } from "./init.js"
function component() {
  const canvas = document.getElementById("canvas")

  if (!canvas) return

  console.log({ canvas })

  init(canvas)

  //   setTimeout(() => {
  importModule()
  //   }, 5000)

  const element = document.createElement("div")

  element.innerHTML = "fafa"

  return element
}

document.body.appendChild(component())

/**
 
    <holy-retro-nestopia onReady=((Service, Module, FS, RA) => {

    }) ></holy-retro-nestopia>

    - copy core js and wasm file to dist folder
    - 

 */
