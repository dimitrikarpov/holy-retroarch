import { ModuleService } from "./retroarch-module/moduleService"

export class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = `<canvas></canvas>`

    this.$canvas = this.querySelector("canvas")
  }

  connectedCallback() {
    const prop1 = this.getAttribute("prop1")

    console.log({ prop1 })

    ModuleService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}
