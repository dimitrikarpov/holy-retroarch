export const convertFileToUint8Array = async (file: File) => {
  const buff = await file.arrayBuffer()
  return new Uint8Array(buff)
}
