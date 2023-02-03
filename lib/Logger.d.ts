/// <reference types="node" />
import { EventEmitter } from 'node:events';
export declare class Logger extends EventEmitter {
    isSaveToCsv: boolean;
    timeZone: 'JST' | 'UTC';
    csvPath: string | null;
    on<K extends keyof LoggerEvents>(events: K, listener: (...args: LoggerEvents[K]) => void): this;
    constructor(isSaveToCsv: boolean, options?: Options);
    /**
     * Emit logger event.
     * @param messages It is converted to a log using join('').
     * @returns log message.
     */
    emitLog(event: keyof Omit<LoggerEvents, 'ready'>, ...messages: string[]): string;
    /**
     * Append new data to CSV.
     *
     * Early returned and not written if Options.path is not set.
     * @returns CSV after appending.
     */
    appendToCsv(log: string): string | null;
    private _formatMessages;
}
export interface LoggerEvents {
    debug: [formattedMessage: string, originalMessages: string[]];
    error: [formattedMessage: string, originalMessages: string[]];
    ready: [logger: Logger];
    system: [formattedMessage: string, originalMessages: string[]];
    info: [formattedMessage: string, originalMessages: string[]];
}
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
