import { convertFileToUint8Array, createRetroarch } from "../../dist/index.js"

let rom
let state

function onStarted() {
  console.log(">>>>>>>>>>> EMULATOR IS STARTED <<<<<<<<<<<<<<<")
}

async function onUploadRom() {
  rom = await convertFileToUint8Array(this.files[0])
}

async function onUploadState() {
  state = await convertFileToUint8Array(this.files[0])
}

async function onStart() {
  const retroarch = await createRetroarch({
    core: "nestopia",
    rom,
    savestate: state,
    onStarted,
  })
  // retroarch.copyConfig()

  retroarch.start()
}

const main = () => {
  const $rom = document.getElementById("rom")
  $rom.addEventListener("change", onUploadRom, false)

  const $state = document.getElementById("state")
  $state.addEventListener("change", onUploadState, false)

  const $start = document.getElementById("start")
  $start.addEventListener("click", onStart, false)
}

main()
