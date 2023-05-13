import { Deferred } from "../utils/Deferred"
import { configureModule } from "./configureModule"
import { injectScript } from "../utils/injectScript"
import { type RetroarchStatus } from "./Retroarch"

export type RetroarchCoreEvent =
  | "core:download-started"
  | "core:download-completed"

export const DIRS = {
  ROOT: "/",
  USERDATA: "home/web_user/retroarch/userdata",
  STATES: "home/web_user/retroarch/userdata/states",
}

export class CoreManager {
  private coreUrl: string
  private deferredOnRuntimeInitialized: Deferred
  public canvas: HTMLCanvasElement
  public module: any
  public fs: any
  public ra: any

  constructor(core: string, canvas: HTMLCanvasElement) {
    this.coreUrl = core
    this.canvas = canvas
    this.deferredOnRuntimeInitialized = new Deferred()
  }

  async downloadCore() {
    configureModule(this.canvas, this.deferredOnRuntimeInitialized.resolve)
    this.dispatchEvent("core:download-started")
    await injectScript(this.coreUrl)
    this.dispatchEvent("core:download-completed")
    await this.deferredOnRuntimeInitialized.promise

    this.module = window.Module
    this.fs = window.FS
    this.ra = window.RA
  }

  copyFile(file: Uint8Array | string, path: string, filename: string) {
    if (this.fs.analyzePath(path).exists === false) {
      this.fs.createPath("/", path, true, true)
    }

    this.fs.writeFile(`${path}/${filename}`, file)
  }

  dispatchEvent(status: RetroarchStatus | RetroarchCoreEvent) {
    const event = new CustomEvent("ra-status", {
      detail: status,
      bubbles: true,
    })
    this.canvas.dispatchEvent(event)
  }
}
