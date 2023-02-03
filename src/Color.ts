/**
 * Colors the font in the output to the console.log.
 *
 * **May be affected by the execution environment.**
 */
export class FontColor {
    /**
     * Add color to string.
     */
    static add(color: keyof Omit<fontColors, 'default' | 'reset'>, str: string): string {
        const colors = Object.keys(fontColorCtrlChar);
        if (!colors.includes(color)) throw Error(ErrorMessages.invalidColor);
        str = this.remove(str);
        return fontColorCtrlChar[color] + str + fontColorCtrlChar.default;
    }

    /**
     * Remove color from string.
     */
    static remove(str: string): string {
        const values = Object.values(fontColorCtrlChar);
        let result = str;
        values.forEach((value) => {
            result = result.replaceAll(value, '');
        });
        return result;
    }
}

type fontColors = typeof fontColorCtrlChar;

const fontColorCtrlChar = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    default: '\x1b[39m',
    reset: '\x1b[0m',
};

const ErrorMessages = {
    invalidColor: 'Invalid color name.',
};
