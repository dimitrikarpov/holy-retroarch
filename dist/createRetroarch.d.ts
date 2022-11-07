import { TCore } from "./retroarch-module/CoreManager";
import { Retroarch } from "./retroarch-module/Retroarch";
export declare type TCreateRetroarchOptions = {
    core: TCore;
    rom?: Uint8Array;
    container?: HTMLElement;
    save?: Uint8Array;
    onStarted?: () => void;
};
export declare const createRetroarch: ({ core, rom, save, }: TCreateRetroarchOptions) => Promise<Retroarch>;
