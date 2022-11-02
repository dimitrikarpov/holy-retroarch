export const DIRS = {
  ROOT: "/",
  USERDATA: "home/web_user/retroarch/userdata",
  STATES: "home/web_user/retroarch/userdata/states",
}

export const copyFile = (file, path, filename) => {
  if (window.FS.analyzePath(path).exists === false) {
    window.FS.createPath("/", path, true, true)
  }

  window.FS.writeFile(`${path}/${filename}`, file)
}
