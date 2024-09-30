import 'colors'
declare global {
    // eslint-disable-next-line no-var
    var logger: loggerType;
}

type loggerType = {
    log: (...args: (object | string)[]) => void;
    error: (...args: (object | string)[]) => void;
    warn: (...args: (object | string)[]) => void;
    info: (...args: (object | string)[]) => void;
    debug: (...args: (object | string)[]) => void;
}

globalThis.logger = {
    log: (...args: (object | string)[]) => {
        console.log(
            ...args.map(arg => typeof arg === 'string' ? arg.blue : arg)
        );
    },
    error: (...args: (object | string)[]) => {
        console.error(
            ...args.map(arg => typeof arg === 'string' ? arg.red : arg)
        );
    },
    warn: (...args: (object | string)[]) => {
        console.warn(
            ...args.map(arg => typeof arg === 'string' ? arg.yellow : arg)
        );
    },
    info: (...args: (object | string)[]) => {
        console.info(
            ...args.map(arg => typeof arg === 'string' ? arg.green : arg)
        );
    },
    debug: (...args: (object | string)[]) => {
        console.debug(
            ...args.map(arg => typeof arg === 'string' ? arg.blue : arg)
        );
    }
};