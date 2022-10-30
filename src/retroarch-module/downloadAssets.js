import { getDownloadUrl } from "./getDownloadUrl"

const getPaths = async () => {
  const indexRes = await fetch(getDownloadUrl("bundle", "indexedfiles-v2.txt"))
  const indexText = await indexRes.text()

  var paths = indexText.split(",,,\n")

  return {
    dirs: JSON.parse(paths[0]),
    files: paths[1].split("\n"),
  }
}

const copyFiles = async (dirs, files, FS = window.FS) => {
  const baseFsBundleDir = "/home/web_user/retroarch/bundle"

  // make directories
  FS.createPath("/", baseFsBundleDir, true, true) // ??
  for (var i = 0; i < dirs.length; i++) {
    FS.createPath(baseFsBundleDir + dirs[i][0], dirs[i][1], true, true)
  }

  // make the files
  for (let i = 0; i < files.length; i++) {
    let fileRes = await fetch(getDownloadUrl("bundle", files[i]))
    const fileData = await fileRes.arrayBuffer()

    FS.writeFile(`${baseFsBundleDir}/${files[i]}`, new Uint8Array(fileData))
  }
}

export const downloadAssets = async () => {
  const { dirs, files } = await getPaths()

  await copyFiles(dirs, files)
}
