const repository_base_url =
  "https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch@master"

export const getDownloadUrl = (type, fileName) => {
  if (!type) return

  if (type === "core") return `${repository_base_url}/cores/${fileName}`

  if (type === "bundle")
    return `${repository_base_url}/cores/bundle/${fileName}`
}
