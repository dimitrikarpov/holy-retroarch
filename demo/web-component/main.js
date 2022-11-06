import { convertFileToUint8Array } from "../../dist/index.js"

let retroarch

async function onUpload() {
  const rom = await convertFileToUint8Array(this.files[0])

  retroarch.copyRom(rom)
  retroarch.start()
}

const main = () => {
  retroarch = document.querySelector("holy-retroarch")

  console.log({ retroarch })

  const $file = document.getElementById("rom")
  $file.addEventListener("change", onUpload, false)
}

main()
