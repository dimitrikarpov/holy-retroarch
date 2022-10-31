import { HolyRetroNestopia } from "./HolyRetroNestopia"

if (!customElements.get("holy-retroarch-nestopia")) {
  customElements.define("holy-retroarch-nestopia", HolyRetroNestopia)
}

export { ModuleService } from "./retroarch-module/moduleService"
export { convertFileToUint8Array } from "./utils/convertFileToUnit8Array"
