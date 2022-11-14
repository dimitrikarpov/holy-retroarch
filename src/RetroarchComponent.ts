import { Retroarch } from "./retroarch-module/Retroarch"

const templateString = `<canvas id="canvas"></canvas>`

/**
 * Retroarch Web Component
 *
 * usage example
 *
 * ```<holy-retroarch core-url="../cores/fceumm_libretro.js"></holy-retroarch>```
 *
 * params:
 * *core-url* - url of used core
 * You can make link to locally hosted cores ```core-url="../cores/fceumm_libretro.js"```
 * or use these repo cdn ```core-url="https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores/fceumm_libretro.js">```
 *
 * *rom-url* - url of rom to load on retroarch start
 * *save-url* - url of save state to load on retroarch start
 */
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
