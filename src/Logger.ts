import { EventEmitter } from 'node:events';
import { readFileSync, writeFileSync } from 'node:fs';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);
import chalk from 'chalk';

export class Logger extends EventEmitter {
    isSaveToCsv: boolean;
    csvPath: string | null;

    public on<K extends keyof LoggerEvents>(events: K, listener: (...args: LoggerEvents[K]) => void): this;
    on(events: string, listener: (...args: any[]) => void) {
        return super.on(events, listener);
    }

    constructor(isSaveToCsv: boolean, options?: Options) {
        super();
        this.isSaveToCsv = isSaveToCsv;
        if (this.isSaveToCsv) {
            // CSVにログを保存する時
            if (!options || !options.path) throw new Error(ErrorMessages.requiredOptions);
            this.csvPath = options.path;
        } else this.csvPath = options?.path ?? null;

        this.emit(EventNames.ready, this);
    }

    /**
     * Emit logger event.
     * @param messages It is converted to a log using join('').
     * @returns log message.
     */
    emitLog(event: keyof Omit<LoggerEvents, 'ready'>, ...messages: string[]): string {
        const formattedMessage = this._formatMessages(event, messages);
        this.emit(event, formattedMessage, messages);
        return formattedMessage;
    }

    system(...messages: string[]): string {
        const formattedMessage = this._formatMessages('system', messages);
        this.emit('system', formattedMessage, messages);
        return formattedMessage;
    }

    info(...messages: string[]): string {
        const formattedMessage = this._formatMessages('info', messages);
        this.emit('info', formattedMessage, messages);
        return formattedMessage;
    }

    debug(...messages: string[]): string {
        const formattedMessage = this._formatMessages('debug', messages);
        this.emit('debug', formattedMessage, messages);
        return formattedMessage;
    }

    warn(...messages: string[]): string {
        const formattedMessage = this._formatMessages('warn', messages);
        this.emit('warn', formattedMessage, messages);
        return formattedMessage;
    }

    err(...messages: string[]): string {
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
    appendToCsv(log: string): string | null {
        if (!this.csvPath) return null;
        const oldLogData = readFileSync(this.csvPath, 'utf-8');
        const newData = oldLogData + log;
        writeFileSync(this.csvPath, newData, 'utf-8');
        return newData;
    }

    private _formatMessages(type: keyof Omit<LoggerEvents, 'ready'>, messages: string[]) {
        const TYPE = type.toUpperCase();
        const message = messages.join('');
        return `${colorLogs[type](`[${dayjs.utc().toISOString()}] [${TYPE}] - `)} ${message}`;
    }
}

export interface LoggerEvents {
    debug: [formattedMessage: string, originalMessages: string[]];
    error: [formattedMessage: string, originalMessages: string[]];
    ready: [logger: Logger];
    system: [formattedMessage: string, originalMessages: string[]];
    info: [formattedMessage: string, originalMessages: string[]];
    warn: [formattedMessage: string, originalMessages: string[]];
}

const colorLogs = {
    system: chalk.blue,
    debug: chalk.gray,
    info: chalk.green,
    warn: chalk.yellow,
    error: chalk.red,
};

export interface Options {
    /**
     * **Absolute** path of CSV file to save logs.
     */
    path?: string;

    /**
     * Time zone for dates inclueded in logs.
     *
     * **default = "JST"**
     */
    timeZone?: 'JST' | 'UTC';
}

const ErrorMessages = {
    requiredOptions: 'Options.path is required if isSaveToCsv is true.',
};

const EventNames = {
    ready: 'ready',
};
