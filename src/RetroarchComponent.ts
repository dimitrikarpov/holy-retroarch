import { Retroarch } from "./retroarch-module/Retroarch"

const templateString = `<canvas id="canvas"></canvas>`

export class RetroarchComponent extends HTMLElement {
  retroarch: Retroarch
  coreUrl: string
  $canvas: HTMLCanvasElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")
    this.coreUrl = this.getAttribute("core-url")

    this.init()
  }

  async init() {
    this.retroarch = new Retroarch(this.coreUrl, this.$canvas)

    await this.retroarch.init()
    this.retroarch.copyConfig()
  }

  disconnectedCallback() {}
}

// <holy-retroarch core-url="" rom-url="" save-url="" >
