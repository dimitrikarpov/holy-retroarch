import { ModuleService } from "./retroarch-module/moduleService"

const templateString = `<canvas></canvas>`

export class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = templateString

    this.$canvas = this.querySelector("canvas")
  }

  connectedCallback() {
    // const prop1 = this.getAttribute("prop1")

    // console.log({ prop1 })

    ModuleService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}
