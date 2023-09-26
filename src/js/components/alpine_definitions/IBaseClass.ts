import type { OnceHandler, THandler } from ".";
import { LogLevel } from './logLevel';



export interface IBaseClass<K extends TeventType> {
    className: string;
    _console: Console;
    silent: boolean;
    loglevel: LogLevel;
    ready: boolean;

    marquee(message: string, ...args): void;
    console: Console;
    debug(...arg: unknown[]): void;
    log(...arg: unknown[]): void;
    error(...arg: unknown[]): void;
    warn(...arg: unknown[]): void;
    info(...arg: unknown[]): void;
    init(): void;
    onReady(handler?: OnceHandler<this>): Promise<this>;

    processHandler: (handler: (() => void) | undefined) => void;
    on<T extends unknown>(event: K, handler?: THandler<T>): Promise<T>
    once<T extends unknown>(event: K, handler?: OnceHandler<T>): Promise<T>
    processEventListeners(event: K, callbackArgument): void;

}
export type TeventType = 'changed' | 'click_save' | 'save' | 'filters_loaded' | 'complete' | 'reload' | 'columns_updated' | 'ready' | 'probe';
type isET = 'ready' extends TeventType ? true : false;
export type TEventStore<K extends (TeventType | 'ready')> = Partial<{
    [key in K]: OnceHandler<any>[];
}>;
type eventready = TEventStore<'ready'>;
