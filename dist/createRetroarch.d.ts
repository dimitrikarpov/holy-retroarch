import { TCore } from "./retroarch-module/RetroarchService";
export declare type TCreateRetroarchOptions = {
    core: TCore;
    rom: Uint8Array;
    container?: HTMLElement;
    save?: Uint8Array;
    onStarted?: () => void;
};
export declare const createRetroarch: ({ container, rom, save, onStarted, core, }: TCreateRetroarchOptions) => Promise<import("./retroarch-module/RetroarchService").IRetroarchService>;
