import { HolyRetroNestopia } from "./HolyRetroNestopia"

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

// https://cdn.jsdelivr.net/gh/dimitrikarpov/libretro-cores-js@master/cores/nestopia_libretro.js

/**
 
    <holy-retro-nestopia onReady=((Service, Module, FS, RA) => {

    }) ></holy-retro-nestopia>

    - copy core js and wasm file to dist folder
    - 

 */
