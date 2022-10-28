export const init = (canvas) => {
  console.log("init canvas")

  const Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized: () => {
      //   copyBundle()
    },
    print: function (text) {
      console.log("stdout: " + text)
    },
    printErr: function (text) {
      console.log("stderr: " + text)
    },
    preRun: [],
    postRun: [],
  }

  window.Module = Module
}
