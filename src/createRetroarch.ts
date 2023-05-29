import { Retroarch } from "./Retroarch"
import { buildCore } from "./buildCore"
import { TSettings } from "./config"

const fetchWasm = async (wasmUrl: string) => {
  const buffer = await (await fetch(wasmUrl)).arrayBuffer()
  return new Uint8Array(buffer)
}

/**
 * fetch core's js and wasm files
 * @param coreUrl url of core js file
 */
export const fetchCore = async (coreUrl: string, wasmUrl?: string) => {
  const coreFactory = (await import(/* webpackIgnore: true */ coreUrl)).default
  const wasmBinary = await fetchWasm(wasmUrl || coreUrl.replace(".js", ".wasm"))

  return { coreFactory, wasmBinary }
}

type CreateRetroarchOptions = {
  canvas: HTMLCanvasElement
  coreUrl: string
  wasmUrl?: string
  settings?: TSettings
  romBinary?: Uint8Array
  onReady?: () => void
  onStart?: () => void
  onDestroy?: () => void
}

export const createRetroarch = async (options: CreateRetroarchOptions) => {
  const { coreFactory, wasmBinary } = await fetchCore(
    options.coreUrl,
    options.wasmUrl,
  )

  const core = await buildCore({
    canvas: options.canvas,
    coreFactory,
    wasmBinary,
    onReady: options.onReady,
  })

  const retroarch = new Retroarch(core, {
    romBinary: options.romBinary,
    onStart: options.onStart,
    onDestroy: options.onDestroy,
  })
  retroarch.copyConfig(options.settings)

  return retroarch
}
