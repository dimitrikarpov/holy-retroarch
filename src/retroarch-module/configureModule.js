export const configureModule = (canvas, onRuntimeInitialized) => {
  const Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized,
    // print: function (text) {
    //   console.log("stdout: " + text)
    // },
    // printErr: function (text) {
    //   // console.log("stderr: " + text)
    // },
    preRun: [],
    postRun: [],
  }

  window.Module = Module
}
