"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const node_events_1 = require("node:events");
const node_fs_1 = require("node:fs");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const chalk_1 = __importDefault(require("chalk"));
class Logger extends node_events_1.EventEmitter {
    isSaveToCsv;
    csvPath;
    on(events, listener) {
        return super.on(events, listener);
    }
    constructor(isSaveToCsv, options) {
        super();
        this.isSaveToCsv = isSaveToCsv;
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
    system(...messages) {
        const formattedMessage = this._formatMessages('system', messages);
        this.emit('system', formattedMessage, messages);
        return formattedMessage;
    }
    info(...messages) {
        const formattedMessage = this._formatMessages('info', messages);
        this.emit('info', formattedMessage, messages);
        return formattedMessage;
    }
    debug(...messages) {
        const formattedMessage = this._formatMessages('debug', messages);
        this.emit('debug', formattedMessage, messages);
        return formattedMessage;
    }
    warn(...messages) {
        const formattedMessage = this._formatMessages('warn', messages);
        this.emit('warn', formattedMessage, messages);
        return formattedMessage;
    }
    err(...messages) {
        const formattedMessage = this._formatMessages('error', messages);
        this.emit('error', formattedMessage, messages);
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
        return `${colorLogs[type](`[${dayjs_1.default.utc().toISOString()}] [${TYPE}] - `)} ${message}`;
    }
}
exports.Logger = Logger;
const colorLogs = {
    system: chalk_1.default.blue,
    debug: chalk_1.default.gray,
    info: chalk_1.default.green,
    warn: chalk_1.default.yellow,
    error: chalk_1.default.red,
};
const ErrorMessages = {
    requiredOptions: 'Options.path is required if isSaveToCsv is true.',
};
const EventNames = {
    ready: 'ready',
};
//# sourceMappingURL=Logger.js.map