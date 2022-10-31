import { ModuleService, convertFileToUint8Array } from "../dist/index.js"

async function onUpload() {
  const rom = await convertFileToUint8Array(this.files[0])
  console.log("onUpload", rom)

  ModuleService.uploadRom(rom)

  setTimeout(() => {
    ModuleService.start()
  }, 2000)
}

const main = () => {
  const $file = document.getElementById("rom")
  $file.addEventListener("change", onUpload, false)

  const $holyRetro = document.createElement("holy-retroarch-nestopia")
  document.body.appendChild($holyRetro)
}

main()
