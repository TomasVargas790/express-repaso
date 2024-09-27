import { register } from "node:module";
import { pathToFileURL } from "node:url";
try {
    // Register the TypeScript ES module loader
    register("ts-node/esm", pathToFileURL("./"));

    // Import and run your main application file
    import('./src/index.ts');
} catch (error) {
    console.error(error);

}