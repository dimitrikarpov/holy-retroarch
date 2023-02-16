export { Retroarch } from "./retroarch-module/Retroarch"
export { toUint8Array } from "./utils/toUint8Array"

export const cores_url =
  "https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores"

declare global {
  interface Window {
    Module: any
    FS: any
    RA: any
    Browser: any
    AudioContext: any
  }
}
