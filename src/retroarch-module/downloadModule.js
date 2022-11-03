const cores_url =
  "https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores"

export const downloadModule = async (moduleName) => {
  const url = `${cores_url}/${moduleName}.js`

  return new Promise((resolve, reject) => {
    if (Boolean(document.querySelector(`[src="${url}"`))) return

    try {
      const script = document.createElement("script")
      script.type = "application/javascript"
      script.src = url
      script.addEventListener("load", resolve)
      script.addEventListener("error", reject)

      document.body.appendChild(script)
    } catch (error) {
      reject(error)
    }
  })
}
