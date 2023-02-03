"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const utils_1 = require("@suzuki3jp/utils");
const node_events_1 = require("node:events");
const node_fs_1 = require("node:fs");
class Logger extends node_events_1.EventEmitter {
    isSaveToCsv;
    timeZone;
    csvPath;
    on(events, listener) {
        return super.on(events, listener);
    }
    constructor(isSaveToCsv, options) {
        super();
        this.isSaveToCsv = isSaveToCsv;
        this.timeZone = options?.timeZone ?? 'JST';
        if (this.isSaveToCsv) {
            // CSVにログを保存する時
            if (!options || !options.path)
                throw new Error(ErrorMessages.requiredOptions);
            this.csvPath = options.path;
        }
        else
            this.csvPath = options?.path ?? null;
        this.emit(EventNames.ready, this);
    }
    /**
     * Emit logger event.
     * @param messages It is converted to a log using join('').
     * @returns log message.
     */
    emitLog(event, ...messages) {
        const formattedMessage = this._formatMessages(event, messages);
        this.emit(event, formattedMessage, messages);
        return formattedMessage;
    }
    /**
     * Append new data to CSV.
     *
     * Early returned and not written if Options.path is not set.
     * @returns CSV after appending.
     */
    appendToCsv(log) {
        if (!this.csvPath)
            return null;
        const oldLogData = (0, node_fs_1.readFileSync)(this.csvPath, 'utf-8');
        const newData = oldLogData + log;
        (0, node_fs_1.writeFileSync)(this.csvPath, newData, 'utf-8');
        return newData;
    }
    _formatMessages(type, messages) {
        const TYPE = type.toUpperCase();
        const message = messages.join('');
        if (this.timeZone === 'JST')
            return `[${utils_1.JST.getDateString()}] ${TYPE}: ${message}\n`;
        return `[${utils_1.UTC.getDateString()}] ${TYPE}: ${message}\n`;
    }
}
exports.Logger = Logger;
const ErrorMessages = {
    requiredOptions: 'Options.path is required if isSaveToCsv is true.',
};
const EventNames = {
    ready: 'ready',
};
//# sourceMappingURL=Logger.js.map