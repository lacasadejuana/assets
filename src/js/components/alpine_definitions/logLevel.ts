
export enum LogLevel {
    ERROR = 5,
    WARN = 4,
    INFO = 3,
    DEBUG = 2,
    TRACE = 1,
}
export const LogLevels = {
    ERROR: 5,
    WARN: 4,
    INFO: 3,
    DEBUG: 2,
    TRACE: 1,
} as const

export const fakeConsole: Console = {
    ...console,
    log: (args: any): void => {
        null;
    },
    info: (args: any): void => {
        null;
    },
    debug: (args: any): void => {
        null;
    },
    warn: (args: any): void => {
        null;
    },
    error: (args: any): void => {
        null;
    },
};
