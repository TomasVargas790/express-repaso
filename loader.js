import { register } from "node:module";
import { pathToFileURL } from "node:url";
import 'colors'

(async () => {
    try {
        // Register the TypeScript ES module loader
        register("ts-node/esm", pathToFileURL("./"));

        // Import and run your main application file
        //await import('./src/utils/logger.ts');
        await import('./src/index.ts');
    } catch (error) {
        console.error("Error while loading the application:".red, error);
    }
})();