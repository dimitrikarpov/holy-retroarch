import { RetroarchComponent } from "./RetroarchComponent"

if (!customElements.get("holy-retroarch")) {
  customElements.define("holy-retroarch", RetroarchComponent)
}

export { createRetroarch } from "./createRetroarch"
export { toUint8Array } from "./utils/toUint8Array"

declare global {
  interface Window {
    Module: any
    FS: any
    RA: any
  }
}
