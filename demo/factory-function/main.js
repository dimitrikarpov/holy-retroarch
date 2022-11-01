import { convertFileToUint8Array, createRetroarch } from "../../dist/index.js"

let rom
let savefile

function onStarted() {
  console.log(">>>>>>>>>>> EMULATOR IS STARTED <<<<<<<<<<<<<<<")
}

async function onUpload() {
  rom = await convertFileToUint8Array(this.files[0])
}

function onStart() {
  createRetroarch({ rom, onStarted })
}

const main = () => {
  const $file = document.getElementById("rom")
  $file.addEventListener("change", onUpload, false)

  const $start = document.getElementById("start")
  $start.addEventListener("click", onStart, false)
}

main()
