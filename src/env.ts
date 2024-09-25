type DBConfig = {
    host: string;
    port: string;
    user: string;
    password: string;
    name: string;
    protocol: string;
};

type ServerConfig = {
    port: string,
    env: string

};

type EnvType = {
    db: DBConfig;
    server: ServerConfig;
};

const validateEnvVariables = (envVariables: string[]): void => {
    envVariables.forEach((variable) => {
        if (!process.env[variable]) {
            console.error(`Error: ${variable} is missing in the environment.`);
            process.exit(1);
        }
    });
};

// Definir las variables de entorno requeridas
const REQUIRED_ENV = ["DB_HOST", "DB_PORT", "DB_USER", "DB_NAME", "DB_PROTOCOL", "SERVER_PORT", "ENVIRONMENT"];
validateEnvVariables(REQUIRED_ENV);

// Desestructurar process.env para hacer el código más limpio
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_PROTOCOL, SERVER_PORT, ENVIRONMENT } = process.env;

// Configuración de la base de datos
const dbConfig: DBConfig = {
    host: DB_HOST as string,
    port: DB_PORT as string,
    user: DB_USER as string,
    password: DB_PASSWORD as string,
    name: DB_NAME as string,
    protocol: DB_PROTOCOL as string
};

// Configuración de la API
const serverConfig: ServerConfig = {
    port: SERVER_PORT as string,
    env: ENVIRONMENT as string,
};

// Configuración global
export const env: EnvType = {
    db: dbConfig,
    server: serverConfig,
};