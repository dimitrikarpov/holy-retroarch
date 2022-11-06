import { RetroarchComponent } from "./RetroarchComponent"

if (!customElements.get("holy-retroarch")) {
  customElements.define("holy-retroarch", RetroarchComponent)
}

export { createRetroarch } from "./createRetroarch"
export { convertFileToUint8Array } from "./utils/convertFileToUnit8Array"

declare global {
  interface Window {
    Module: any
    FS: any
    RA: any
  }
}
