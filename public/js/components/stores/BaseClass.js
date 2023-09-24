import { tap } from '../plugins';
import { LogLevel, LogLevels, fakeConsole } from '../alpine_definitions/logLevel';
import { staticFetchWrapper } from '../decorators';
export class BaseClass {
    async onReady(handler) {
        return this.once('ready', handler);
    }
    on(event, handler) {
        this.eventListeners[event] = this.eventListeners[event] || [];
        if (handler) {
            return this.tap(() => {
                if (typeof handler !== 'function') {
                    this.console.warn('handler is not a function', handler);
                }
                if ((event === 'ready' && this.ready) || (this.fulfilledEvents[event] === true))
                    return handler(this);
                this.eventListeners[event].push(handler);
            });
        }
        else {
            return new Promise(res => {
                if ((event === 'ready' && this.ready) || (this.fulfilledEvents[event] === true))
                    return res(this);
                this.eventListeners[event].push(res);
            });
        }
    }
    once(event, handler) {
        this.eventListeners[event] = this.eventListeners[event] || [];
        if (handler) {
            return this.tap(() => {
                if (typeof handler !== 'function') {
                    this.console.warn('handler is not a function', handler);
                }
                if ((event === 'ready' && this.ready) || (this.fulfilledEvents[event] === true))
                    return handler(this);
                handler.once = true;
                this.eventListeners[event].push(handler);
            });
        }
        else {
            return new Promise(res => {
                if ((event === 'ready' && this.ready) || (this.fulfilledEvents[event] === true))
                    return res(this);
                //@ts-ignore
                res.once = true;
                this.eventListeners[event].push(res);
            });
        }
    }
    processEventListeners(event, callbackArgument) {
        callbackArgument = callbackArgument || this;
        if (!this.eventListeners[event] || !this.eventListeners[event].length)
            return;
        this.marquee(' firing ' + this.eventListeners[event].length + ' handlers for ' + event + ' event ');
        let onceHandlers = this.eventListeners[event].filter(h => h.once), otherHandlers = this.eventListeners[event].filter(h => !h.once);
        while (onceHandlers.length) {
            onceHandlers.shift()(callbackArgument);
            //console.log('process onceHandler ' + onceHandlers.length + ' remaining')
        }
        otherHandlers.forEach(cb => cb(callbackArgument));
        this.eventListeners[event] = otherHandlers;
    }
    processHandler(handler) {
        if (typeof handler === 'function') {
            handler(this);
        }
        requestAnimationFrame(() => this.processEventListeners('ready', this));
    }
    marquee(message, ...args) {
        /*console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: this.timerColor,
            [String(this.constructor.name)]: this.classNameColor,
            [message]: '',
            //@ts-ignore
        }, ...args)*/
        console.timerInfo(this.className, message, ...args);
    }
    get console() {
        return this.silent ? fakeConsole : this._console;
    }
    debug(...arg) {
        this.loglevel >= LogLevels.DEBUG && this.console.debug(...arg);
    }
    log(...arg) {
        this.loglevel >= LogLevels.INFO && this.console.log(...arg);
    }
    error(...arg) {
        this.loglevel >= LogLevels.ERROR && this.console.error(...arg);
    }
    warn(...arg) {
        this.loglevel >= LogLevels.WARN && this.console.warn(...arg);
    }
    info(...arg) {
        this.loglevel >= LogLevels.INFO && this.console.info(...arg);
    }
    constructor() {
        this.className = 'BaseClass';
        this.silent = false;
        this.loglevel = LogLevel.INFO;
        this.timerColor = 'color:blue;font-weight:bold';
        this.classNameColor = 'color:blue;font-weight:bold;';
        this.onReadyHandlers = [];
        /**
         * Handlers declared on an event that is fulfilled should be invoked inmediately
         */
        this.fulfilledEvents = {};
        this.eventListeners = {};
    }
    init() {
        this.console.log('init');
    }
    get $store() {
        return {
            tipos_busqueda: Alpine.store('tipos_busqueda'),
            columnas_actuales: Alpine.store('columnas_actuales'),
            campos_busqueda: Alpine.store('campos_busqueda'),
            negocios: Alpine.store('negocios'),
            roles_negocio: Alpine.store('roles_negocio'),
            active_filter: Alpine.store('active_filter'),
            maps: Alpine.store('maps'),
            user: Alpine.store('user')
        };
    }
    tap(handler) {
        if (typeof handler !== 'function') {
            console.warn('handler is not a function', { handler });
            return this;
        }
        return tap(this, handler);
    }
    /**
     * Boilerplate for generic json fetch. Won't work with other content types.
     * @param endpoint
     * @param options
     * @returns
     */
    fetchWrapper(endpoint, options) {
        return BaseClass.staticFetchWrapper(endpoint, options);
    }
    static staticFetchWrapper(endpoint, options) {
        return staticFetchWrapper(endpoint, options);
    }
}
Object.defineProperty(BaseClass.prototype, 'init', { enumerable: true });
//# sourceMappingURL=BaseClass.js.map