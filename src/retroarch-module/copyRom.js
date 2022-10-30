export const copyRom = (rom) => {
  window.FS.writeFile("/rom.bin", rom)
}
