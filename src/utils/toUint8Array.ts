export const toUint8Array = {
  /**
   * converts File to Uint8Array
   * @param file binary
   * @returns binary
   */
  fromFile: async (file: File) => {
    const buff = await file.arrayBuffer()
    return new Uint8Array(buff)
  },

  /**
   * converts base64 string to Uint8Array
   * @param base64 string
   * @returns binary
   */
  fromBase64: async (base64: string) => {
    const buffer = await (await fetch(base64)).arrayBuffer()
    return new Uint8Array(buffer)
  },
}
