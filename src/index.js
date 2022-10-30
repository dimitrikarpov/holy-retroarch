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

/**
 
    <holy-retro-nestopia onReady=((Service, Module, FS, RA) => {

    }) ></holy-retro-nestopia>

    - copy core js and wasm file to dist folder
    - 

 */
