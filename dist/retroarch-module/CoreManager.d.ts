export declare const DIRS: {
    ROOT: string;
    USERDATA: string;
    STATES: string;
};
export declare type TCore = "nestopia" | "fceumm";
export declare class CoreManager {
    private core;
    private deferredOnRuntimeInitialized;
    canvas: HTMLCanvasElement;
    module: any;
    fs: any;
    ra: any;
    constructor(core: TCore, canvas: HTMLCanvasElement);
    downloadCore(): Promise<void>;
    copyFile(file: Uint8Array | string, path: string, filename: string): void;
}
