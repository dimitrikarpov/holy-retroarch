export declare const toUint8Array: {
    /**
     * converts File to Uint8Array
     * @param file binary
     * @returns binary
     */
    fromFile: (file: File) => Promise<Uint8Array>;
    /**
     * converts base64 string to Uint8Array
     * @param base64 string
     * @returns binary
     */
    fromBase64: (base64: string) => Promise<Uint8Array>;
};
