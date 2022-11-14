import { Deferred } from "../utils/Deferred"
import { configureModule } from "./configureModule"
import { injectScript } from "../utils/injectScript"

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
    await injectScript(this.coreUrl)
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
}
