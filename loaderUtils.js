const longArgs = arg => {
    const [key, value] = arg.split('=');
    return { [key.slice(2)]: value || true }
};

const flags = arg => [...arg.slice(1)].reduce((flagObj, f) => ({ ...flagObj, [f]: true }), {});


export const args = () =>
    // eslint-disable-next-line no-undef
    process.argv
        .slice(2)
        .reduce((args, arg) => ({
            ...args,
            ...((arg.startsWith('--') && longArgs(arg)) || (arg[0] === '-' && flags(arg)))
        }), {});