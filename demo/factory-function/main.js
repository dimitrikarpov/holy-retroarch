import {
  ModuleService,
  convertFileToUint8Array,
  createRetroarch,
} from "../../dist/index.js"

let rom
let savefile

async function onUpload() {
  rom = await convertFileToUint8Array(this.files[0])
  console.log({ rom })
}

function onStart() {
  console.log({ createRetroarch })

  createRetroarch(undefined, rom)
}

const main = () => {
  const $file = document.getElementById("rom")
  $file.addEventListener("change", onUpload, false)

  const $start = document.getElementById("start")
  $start.addEventListener("click", onStart, false)
}

main()
