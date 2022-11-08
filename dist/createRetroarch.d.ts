import { TCore } from "./retroarch-module/CoreManager";
import { Retroarch } from "./retroarch-module/Retroarch";
export declare type TCreateRetroarchOptions = {
    core: TCore;
    rom?: Uint8Array;
    save?: Uint8Array;
    container?: HTMLDivElement;
};
export declare const createRetroarch: ({ core, rom, save, container, }: TCreateRetroarchOptions) => Promise<Retroarch>;
