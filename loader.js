import { register } from "node:module";
import { pathToFileURL } from "node:url";
import 'colors'

const longArgs = arg => {
    const [key, value] = arg.split('=');
    return { [key.slice(2)]: value || true }
};

const flags = arg => [...arg.slice(1)].reduce((flagObj, f) => ({ ...flagObj, [f]: true }), {});


const args = () =>
    // eslint-disable-next-line no-undef
    process.argv
        .slice(2)
        .reduce((args, arg) => ({
            ...args,
            ...((arg.startsWith('--') && longArgs(arg)) || (arg[0] === '-' && flags(arg)))
        }), {});

console.log(args());

(async () => {
    try {
        const currentArgs = args();
        register("ts-node/esm", pathToFileURL("./"));

        await import('./src/utils/logger.ts');
        if (currentArgs.index) await import('./src/index.ts');
        else if (currentArgs.delete) await import('./src/db/connection/revert-all.ts');
    } catch (error) {
        console.error("Error while loading the application:".red, error);
    }
})();
