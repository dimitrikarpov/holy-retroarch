export const injectScript = async (url: string) => {
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
