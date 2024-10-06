import { args } from "./loaderUtils.js";
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import 'colors';
/* import tsConfigPaths from "tsconfig-paths";

// Register TypeScript paths
tsConfigPaths.register({
    baseUrl: "./src",
    paths: {
        "@db/*": ["db/*"],
        "@api/*": ["api/*"],
        "@utils/*": ["utils/*"],
        "@auth/*": ["auth/*"]
    }
}); */

(async () => {
    try {
        const currentArgs = args();
        await import('./node_modules/tsc-alias/dist/index.js');
        register("ts-node/esm", pathToFileURL("./"));
        register("tsc-alias", pathToFileURL("./"));
        await import('./src/utils/logger.ts');
        if (currentArgs.index) {
            await import('./src/index.ts');
        } else if (currentArgs.delete) {
            await import('./src/db/connection/revert-all.ts');
        }
    } catch (error) {
        console.error("Error while loading the application:".red, error);
    }
})();