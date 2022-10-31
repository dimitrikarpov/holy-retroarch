export const convertFileToUint8Array = async (file) => {
  const buff = await file.arrayBuffer()
  return new Uint8Array(buff)
}
