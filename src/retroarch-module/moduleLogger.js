import { RetroarchService } from "./RetroarchService"

const isEmulatorStarted = (message) => {
  let isStarted = false

  if (message.includes("VSync => ON")) {
    isStarted = true

    RetroarchService.onEmulatorStarted()
  }
}

const log = (message) => {
  // hide assets warning
  if (message.includes("Asset missing")) return

  // check is emulator started
  isEmulatorStarted(message)

  console.warn(message)
}

export const moduleLogger = () => {
  return {
    print: log,
    printErr: log,
  }
}
