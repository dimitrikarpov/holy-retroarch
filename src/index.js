import { HolyRetroNestopia } from "./HolyRetroNestopia"
import { convertFileToUint8Array } from "./utils/convertFileToUnit8Array"

if (!customElements.get("holy-retroarch-nestopia")) {
  customElements.define("holy-retroarch-nestopia", HolyRetroNestopia)
}
