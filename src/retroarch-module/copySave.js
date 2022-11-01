export const copySave = (state) => {
  window.FS.createPath(
    "/",
    "home/web_user/retroarch/userdata/states",
    true,
    true,
  )
  window.FS.writeFile(
    "/home/web_user/retroarch/userdata/states/rom.state",
    state,
  )
}
