import { toUint8Array, Retroarch } from "../dist/index.js"

let rom
let state
let retroarch

async function onUploadRom() {
  rom = await toUint8Array.fromFile(this.files[0])
}

async function onUploadState() {
  state = await toUint8Array.fromFile(this.files[0])
}

async function onStart() {
  const canvas = document.getElementById("canvas")

  retroarch = new Retroarch("../cores/fceumm_libretro.js", canvas)
  await retroarch.init()

  if (rom) retroarch.copyRom(rom)
  if (state) retroarch.copySave(state)

  setTimeout(() => {
    retroarch.start()
  }, 1000)
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
