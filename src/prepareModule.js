const prepareModule = (canvas) => {
  const Module = {
    canvas, // document.getElementById("canvas"),
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized: () => {
      copyBundle()
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
