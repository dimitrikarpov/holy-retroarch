import { RetroarchService } from "./retroarch-module/RetroarchService"

const templateString = `<canvas id="canvas"></canvas>`

export class RetroarchComponent extends HTMLElement {
  constructor() {
    super()

    this.retroarchService = RetroarchService
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")

    RetroarchService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}
