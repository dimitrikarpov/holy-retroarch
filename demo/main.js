import { ModuleService, convertFileToUint8Array } from "../dist/index.js"

async function onUpload() {
  const rom = await convertFileToUint8Array(this.files[0])

  ModuleService.uploadRom(rom)
  ModuleService.start()
}

const main = () => {
  const $file = document.getElementById("rom")
  $file.addEventListener("change", onUpload, false)
}

main()
