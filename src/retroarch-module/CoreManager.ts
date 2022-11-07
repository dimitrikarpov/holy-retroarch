import { Deferred } from "../utils/Deferred"
import { configureModule } from "./configureModule"
import { injectScript } from "../utils/injectScript"

const cores_url =
  "https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores"

export const DIRS = {
  ROOT: "/",
  USERDATA: "home/web_user/retroarch/userdata",
  STATES: "home/web_user/retroarch/userdata/states",
}

export type TCore = "nestopia" | "fceumm"

export class CoreManager {
  private core: TCore
  private deferredOnRuntimeInitialized: Deferred
  public canvas: HTMLCanvasElement
  public module: any
  public fs: any
  public ra: any

  constructor(core: TCore, canvas: HTMLCanvasElement) {
    this.core = core
    this.canvas = canvas
    this.deferredOnRuntimeInitialized = new Deferred()
  }

  async downloadCore() {
    configureModule(this.canvas, this.deferredOnRuntimeInitialized.resolve)
    await injectScript(`${cores_url}/${this.core}_libretro.js`)
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
