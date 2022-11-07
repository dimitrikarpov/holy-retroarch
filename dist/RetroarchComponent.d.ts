import { TCore } from "./retroarch-module/CoreManager";
import { Retroarch } from "./retroarch-module/Retroarch";
export declare class RetroarchComponent extends HTMLElement {
    retroarch: Retroarch;
    core: TCore;
    $canvas: HTMLCanvasElement;
    constructor();
    connectedCallback(): void;
    init(): Promise<void>;
    disconnectedCallback(): void;
}
