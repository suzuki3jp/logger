/**
 * Colors the font in the output to the console.log.
 *
 * **May be affected by the execution environment.**
 */
export declare class FontColor {
    /**
     * Add color to string.
     */
    static add(color: keyof Omit<fontColors, 'default' | 'reset'>, str: string): string;
    /**
     * Remove color from string.
     */
    static remove(str: string): string;
}
type fontColors = typeof fontColorCtrlChar;
declare const fontColorCtrlChar: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    default: string;
    reset: string;
};
export declare class BackgroundColor {
    /**
     * Add background color to string.
     */
    static add(color: keyof Omit<backgroundColors, 'default'>, str: string): string;
    /**
     * Remove background color from string.
     */
    static remove(str: string): string;
}
type backgroundColors = typeof backgroundColorCtrlChar;
declare const backgroundColorCtrlChar: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    default: string;
};
export {};
