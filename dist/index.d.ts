export { RetroarchService } from "./retroarch-module/RetroarchService";
export { convertFileToUint8Array } from "./utils/convertFileToUnit8Array";
export { createRetroarch } from "./createRetroarch";
declare global {
    interface Window {
        Module: any;
        FS: any;
        RA: any;
    }
}
