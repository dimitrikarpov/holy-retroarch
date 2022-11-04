export type TCore = "nestopia" | "fceumm"

export interface IRetroarchService {
  prepare: (canvas: HTMLCanvasElement, core: TCore) => Promise<void>
  uploadSave: (state: Uint8Array) => void
  uploadRom: (rom: Uint8Array) => void
  start: () => void
  loadSave: () => void
  onEmulatorStarted: () => void
}

export type TCreateRetroarchOptions = {
  core: TCore
  rom: Uint8Array
  container?: HTMLElement
  save?: Uint8Array
  onStarted?: () => void
}

export type TCreateRetroarch = (
  options: TCreateRetroarchOptions,
) => Promise<IRetroarchService>
