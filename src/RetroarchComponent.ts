import { RetroarchService } from "./retroarch-module/RetroarchService"

const templateString = `<canvas id="canvas"></canvas>`

export class RetroarchComponent extends HTMLElement {
  retroarchService
  core
  $canvas

  constructor() {
    super()

    this.retroarchService = RetroarchService
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")

    this.core = this.getAttribute("core")

    RetroarchService.prepare(this.$canvas, this.core)
  }

  disconnectedCallback() {}
}
