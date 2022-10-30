import { defaultKeybinds, extraConfig, nulKeys } from "./defaultConfig"

export const copyConfig = () => {
  window.FS.createPath("/", "home/web_user/retroarch/userdata", true, true)
  window.FS.writeFile(
    "/home/web_user/retroarch/userdata/retroarch.cfg",
    stringifySettings({ ...defaultKeybinds, ...extraConfig, ...nulKeys }),
  )
}
