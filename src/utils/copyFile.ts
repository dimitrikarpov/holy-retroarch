export const DIRS = {
  ROOT: "/",
  USERDATA: "home/web_user/retroarch/userdata",
  STATES: "home/web_user/retroarch/userdata/states",
}

export const copyFile = (
  file: Uint8Array | string,
  path: string,
  filename: string,
) => {
  if (window.FS.analyzePath(path).exists === false) {
    window.FS.createPath("/", path, true, true)
  }

  window.FS.writeFile(`${path}/${filename}`, file)
}
