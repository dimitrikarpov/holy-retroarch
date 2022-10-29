export class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()

    this.innerHTML = `<canvas></canvas>`

    this.canvas = this.querySelector("canvas")

    console.log({ canvas: this.canvas })
  }

  connectedCallback() {
    const prop1 = this.getAttribute("prop1")

    console.log({ prop1 })
  }

  disconnectedCallback() {}
}
