import { HolyRetroNestopia } from "./HolyRetroNestopia"

if (!customElements.get("holy-retroarch-nestopia")) {
  customElements.define("holy-retroarch-nestopia", HolyRetroNestopia)
}
