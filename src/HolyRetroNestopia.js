import { ModuleService } from "./retroarch-module/moduleService"

const templateString = `<canvas id="canvas"></canvas>`

export class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")

    ModuleService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}
