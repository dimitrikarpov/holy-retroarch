import { toUint8Array, createRetroarch } from "../../dist/index.js"

let rom
let state

async function onUploadRom() {
  rom = await toUint8Array.fromFile(this.files[0])
}

async function onUploadState() {
  state = await toUint8Array.fromFile(this.files[0])
}

async function onStart() {
  setTimeout(async () => {
    const retroarch = await createRetroarch({
      core: "fceumm",
      rom,
      save: state,
    })

    retroarch.start()
  }, 2000)

  // setTimeout(() => {
  //   const canvasEl = document.getElementById("canvas")
  //   const videoStream = canvasEl.captureStream()
  // }, 2000)
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
