export { retroarch } from "./retroarch-module/retroarch";
export { createRetroarch } from "./createRetroarch";
export { convertFileToUint8Array } from "./utils/convertFileToUnit8Array";
declare global {
    interface Window {
        Module: any;
        FS: any;
        RA: any;
    }
}
