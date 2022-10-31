export const isEmulatorStarted = (message) => {
  const isStarted = false

  if (message.endsWith === "VSync => ON" && !isStarted) {
    isStarted = true
  }
}
