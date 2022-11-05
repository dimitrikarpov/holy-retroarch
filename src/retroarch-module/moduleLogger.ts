import { retroarch } from "./retroarch"

const isEmulatorStarted = (message: string) => {
  let isStarted = false

  if (message.includes("VSync => ON")) {
    isStarted = true

    retroarch.onEmulatorStarted()
  }
}

const log = (message: string) => {
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
