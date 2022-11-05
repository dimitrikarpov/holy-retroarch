import { Retroarch, retroarch, TCore } from "./retroarch-module/retroarch"

const templateString = `<canvas id="canvas"></canvas>`

export class RetroarchComponent extends HTMLElement {
  retroarch: Retroarch
  core: TCore
  $canvas: HTMLCanvasElement

  constructor() {
    super()

    this.retroarch = retroarch
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")
    this.core = this.getAttribute("core") as TCore

    retroarch.prepare(this.$canvas, this.core)
  }

  disconnectedCallback() {}
}
