"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundColor = exports.FontColor = void 0;
/**
 * Colors the font in the output to the console.log.
 *
 * **May be affected by the execution environment.**
 */
class FontColor {
    /**
     * Add color to string.
     */
    static add(color, str) {
        const colors = Object.keys(fontColorCtrlChar);
        if (!colors.includes(color))
            throw Error(ErrorMessages.invalidColor);
        str = this.remove(str);
        return fontColorCtrlChar[color] + str + fontColorCtrlChar.default;
    }
    /**
     * Remove color from string.
     */
    static remove(str) {
        const values = Object.values(fontColorCtrlChar);
        let result = str;
        values.forEach((value) => {
            result = result.replaceAll(value, '');
        });
        return result;
    }
}
exports.FontColor = FontColor;
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
class BackgroundColor {
    /**
     * Add background color to string.
     */
    static add(color, str) {
        const colors = Object.keys(backgroundColorCtrlChar);
        if (!colors.includes(color))
            throw Error(ErrorMessages.invalidColor);
        str = this.remove(str);
        return backgroundColorCtrlChar[color] + str + backgroundColorCtrlChar.default;
    }
    /**
     * Remove background color from string.
     */
    static remove(str) {
        const values = Object.values(backgroundColorCtrlChar);
        let result = str;
        values.forEach((value) => {
            result = result.replaceAll(value, '');
        });
        return result;
    }
}
exports.BackgroundColor = BackgroundColor;
const backgroundColorCtrlChar = {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    default: '\x1b[49m',
};
const ErrorMessages = {
    invalidColor: 'Invalid color name.',
};
//# sourceMappingURL=Color.js.map