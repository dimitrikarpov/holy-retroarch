import { ModuleService } from "./retroarch-module/moduleService"

const templateString = `<canvas></canvas>`

export class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")
    // const prop1 = this.getAttribute("prop1")
    // console.log({ prop1 })

    console.log("is connected!!")

    ModuleService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}
