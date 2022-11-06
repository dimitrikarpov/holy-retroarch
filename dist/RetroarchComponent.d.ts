import { Retroarch, TCore } from "./retroarch-module/retroarch";
export declare class RetroarchComponent extends HTMLElement {
    retroarch: Retroarch;
    core: TCore;
    $canvas: HTMLCanvasElement;
    constructor();
    connectedCallback(): void;
    init(): Promise<void>;
    disconnectedCallback(): void;
}
