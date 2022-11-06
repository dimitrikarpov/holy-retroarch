import { Retroarch, TCore } from "./retroarch-module/retroarch"

const templateString = `<canvas id="canvas"></canvas>`

export class RetroarchComponent extends HTMLElement {
  retroarch: Retroarch
  core: TCore
  $canvas: HTMLCanvasElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")
    this.core = this.getAttribute("core") as TCore

    this.init()
  }

  async init() {
    this.retroarch = new Retroarch(this.core, this.$canvas)
    await this.retroarch.downloadCore()
    this.retroarch.copyConfig()
  }

  disconnectedCallback() {}
}
