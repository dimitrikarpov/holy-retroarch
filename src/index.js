import { HolyRetroNestopia } from "./HolyRetroNestopia.js"

const registerComponent = (name, Component) => {
  if (!customElements.get(name)) {
    customElements.define(name, Component)
  }
}

const main = () => {
  console.log("main")
  registerComponent("holy-retro-nestopia", HolyRetroNestopia)
}

main()

// const { downloadModule } = require("./downloadModule.js")

// function component() {
//   // const canvas = document.getElementById("canvas")

//   // if (!canvas) return

//   // console.log({ canvas })

//   const element = document.createElement("div")

//   element.innerHTML = "fafa"

//   // downloadModule(
//   //   "https://cdn.jsdelivr.net/gh/dimitrikarpov/libretro-cores-js@master/cores/nestopia_libretro.js",
//   // )

//   return element
// }

// document.body.appendChild(component())

// https://cdn.jsdelivr.net/gh/dimitrikarpov/libretro-cores-js@master/cores/nestopia_libretro.js

/**
 
    <holy-retro-nestopia onReady=((Service, Module, FS, RA) => {

    }) ></holy-retro-nestopia>

    - copy core js and wasm file to dist folder
    - 

 */
