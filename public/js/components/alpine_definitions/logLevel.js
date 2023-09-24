export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
})(LogLevel || (LogLevel = {}));
export const LogLevels = {
    ERROR: 5,
    WARN: 4,
    INFO: 3,
    DEBUG: 2,
    TRACE: 1,
};
export const fakeConsole = {
    ...console,
    log: (args) => {
        null;
    },
    info: (args) => {
        null;
    },
    debug: (args) => {
        null;
    },
    warn: (args) => {
        null;
    },
    error: (args) => {
        null;
    },
};
//# sourceMappingURL=logLevel.js.map