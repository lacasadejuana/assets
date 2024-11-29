/// <reference types="alpinejs" />
import type { ICamposBusqueda, IMapStore, INegocioStore, IRolesNegocioStore, IUserStore, OnceHandler, THandler } from "@lacasadejuana/types";
import { IFilterStore, iCurrentColumns } from "@lacasadejuana/types";
import { tap } from '../plugins';


import { LogLevel, LogLevels, fakeConsole } from '@lacasadejuana/types/src/logLevel';

import { IBaseClass, TEventStore, TeventType, XTipoBusquedaStore } from '@lacasadejuana/types';
import { staticFetchWrapper } from '../decorators';


export abstract class BaseClass implements IBaseClass<TeventType> {
    public className: string = 'BaseClass'
    _console: Console
    silent: boolean = false;
    loglevel: LogLevel = LogLevel.INFO
    protected timerColor: string = 'color:blue;font-weight:bold'
    protected classNameColor: string = 'color:blue;font-weight:bold;'
    events: TeventType
    ready: boolean
    onReadyHandlers: THandler<this>[] = []
    async onReady(handler?: OnceHandler<this>): Promise<this> {
        return this.once<this>('ready' as TeventType, handler)
    }
    /**
     * Handlers declared on an event that is fulfilled should be invoked inmediately
     */
    get verifiers(): Record<TeventType, boolean> {
        return {
            'ready': this.ready
        } as Record<TeventType, boolean>
    }
    eventListeners: TEventStore<TeventType> = {}

    on<T extends unknown>(event: TeventType, handler: THandler<T>): Promise<T> {
        this.eventListeners[event] = this.eventListeners[event] || []
        if (handler) {
            return this.tap(() => {
                if (typeof handler !== 'function') {
                    this.console.warn('handler is not a function', handler)
                }
                if ((event === 'ready' && this.ready) || (this.verifiers[event] === true)) return handler(this as unknown as T);

                this.eventListeners[event].push(handler as OnceHandler<T>)
            })
        } else {
            return new Promise(res => {
                if ((event === 'ready' && this.ready) || (this.verifiers[event] === true)) return res(this as unknown as T)
                this.eventListeners[event].push(res as OnceHandler<T>)
            })
        }

    }
    once<T extends unknown>(event: TeventType, handler: THandler<T>): Promise<T> {
        this.eventListeners[event] = this.eventListeners[event] || []

        if (handler) {
            return this.tap(() => {
                if (typeof handler !== 'function') {
                    this.console.warn('handler is not a function', handler)
                }
                if ((event === 'ready' && this.ready) || (this.verifiers[event] === true)) return handler(this as unknown as T);

                (handler as OnceHandler<T>).once = true;

                this.eventListeners[event].push((handler as OnceHandler<T>))
            })
        } else {
            return new Promise(res => {
                if ((event === 'ready' && this.ready) || (this.verifiers[event] === true)) return res(this as unknown as T)
                //@ts-ignore
                res.once = true;
                this.eventListeners[event].push(res as OnceHandler<T>)
            })
        }

    }
    processEventListeners(event: string, callbackArgument) {
        callbackArgument = callbackArgument || this;
        if (!this.eventListeners[event] || !this.eventListeners[event].length) return


        let onceHandlers = this.eventListeners[event].filter(h => h.once),
            otherHandlers = this.eventListeners[event].filter(h => !h.once);
        this.eventListeners[event] = otherHandlers
        if (onceHandlers.length) {
            this.marquee(' firing ' + onceHandlers.length + ' onceHandlers for ' + event + ' event ');
            while (onceHandlers.length) {
                let onceHandler = onceHandlers.shift()
                if (typeof onceHandler !== 'function') continue
                try {
                    requestAnimationFrame(() => onceHandler(callbackArgument))
                } catch (e) {
                    console.error('error in onceHandler', e)
                }
                //console.log('process onceHandler ' + onceHandlers.length + ' remaining')
            }
        }
        if (otherHandlers.length) {
            this.marquee(' firing ' + otherHandlers.length + ' regular handlers for ' + event + ' event ');
            otherHandlers.forEach(cb => requestAnimationFrame(() => cb(callbackArgument)))
        }
        this.marquee(' done firing ' + event + ' event ');
    }
    processEventListenersAlt(event: string, callbackArgument) {
        callbackArgument = callbackArgument || this;
        if (!this.eventListeners[event] || !this.eventListeners[event].length) return

        let onceHandlers = this.eventListeners[event].filter(h => h.once),
            otherHandlers = this.eventListeners[event].filter(h => !h.once);

        this.marquee(' firing ' + onceHandlers.length + ' onceHandlers for ' + event + ' event ');
        while (onceHandlers.length) {
            let onceHandler = onceHandlers.shift();
            requestAnimationFrame(() => onceHandler(callbackArgument))
            //console.log('process onceHandler ' + onceHandlers.length + ' remaining')
        }
        this.marquee(' firing ' + otherHandlers.length + ' regular handlers for ' + event + ' event ');
        otherHandlers.forEach(cb => requestAnimationFrame(() => cb(callbackArgument)))
        this.eventListeners[event] = otherHandlers
    }
    processHandler(handler) {
        if (typeof handler === 'function') {
            handler(this);
        }
        requestAnimationFrame(() => this.processEventListeners('ready', this))


    }
    marquee(message: string, ...args): void {

        console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: this.timerColor,
            [String(this.constructor.name)]: this.classNameColor,
            [message]: '',
            //@ts-ignore
        }, ...args)
        //console.timerInfo(this.className, message, ...args)
    }
    get console(): Console {
        return this.silent ? fakeConsole : this._console
    }
    debug(...arg: unknown[]): void {
        this.loglevel >= LogLevels.DEBUG && this.console.debug(...arg)
    }
    log(...arg: unknown[]): void {
        this.loglevel >= LogLevels.INFO && this.console.log(...arg)
    }
    error(...arg: unknown[]): void {
        this.loglevel >= LogLevels.ERROR && this.console.error(...arg)
    }
    warn(...arg: unknown[]): void {
        this.loglevel >= LogLevels.WARN && this.console.warn(...arg)
    }
    info(...arg: unknown[]): void {
        this.loglevel >= LogLevels.INFO && this.console.info(...arg)
    }

    constructor() {

    }
    init() {
        this.console.log('init')
    }

    get $store() {
        return {
            tipos_busqueda: (Alpine.store('tipos_busqueda') as XTipoBusquedaStore),
            columnas_actuales: (Alpine.store('columnas_actuales') as iCurrentColumns),
            campos_busqueda: (Alpine.store('campos_busqueda') as ICamposBusqueda),
            negocios: (Alpine.store('negocios') as INegocioStore),
            roles_negocio: (Alpine.store('roles_negocio') as IRolesNegocioStore),
            active_filter: (Alpine.store('active_filter') as IFilterStore),
            maps: (Alpine.store('maps') as IMapStore),
            user: (Alpine.store('user') as IUserStore)
        }
    }
    tap(handler) {
        if (typeof handler !== 'function') {
            console.warn('handler is not a function', { handler })
            return this
        }
        return tap(this, handler)
    }
    /**
     * Boilerplate for generic json fetch. Won't work with other content types.
     * @param endpoint 
     * @param options 
     * @returns 
     */
    fetchWrapper<T extends unknown>(endpoint: string, options: RequestInit): Promise<T> {
        return BaseClass.staticFetchWrapper<T>(endpoint, options)
    }
    static staticFetchWrapper<T extends unknown>(endpoint: string, options: RequestInit): Promise<T> {
        return staticFetchWrapper<T>(endpoint, options)
    }
}

Object.defineProperty(BaseClass.prototype, 'init', { enumerable: true });
