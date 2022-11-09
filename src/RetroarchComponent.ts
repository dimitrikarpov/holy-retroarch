import { TCore } from "./retroarch-module/CoreManager"
import { Retroarch } from "./retroarch-module/Retroarch"

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

    console.log("FFFFFFFFFFFFFFFFFFFffff", this.retroarch)

    await this.retroarch.init()
    this.retroarch.copyConfig()
  }

  disconnectedCallback() {}
}
