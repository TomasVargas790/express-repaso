import { DataSource } from "typeorm";

let retryAttempts = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

export function connectWithRetry(AppDataSource: DataSource) {
    console.log(`[DATABASE ATTEMPT]>> Attempt ${retryAttempts + 1} of ${MAX_RETRIES}`);

    AppDataSource.initialize()
        .then(() => {
            console.log('[DATABASE CONNECTED]');
        })
        .catch((error) => {
            console.log('[ERROR DATABASE CONNECTION]>>', error);
            retryAttempts++;

            if (retryAttempts < MAX_RETRIES && !AppDataSource.isInitialized) {
                console.log(`[RETRYING CONNECTION]>> Retrying in ${RETRY_DELAY / 1000} seconds...`);
                setTimeout(() => connectWithRetry(AppDataSource), RETRY_DELAY);
            } else {
                console.log('[FAILED TO CONNECT AFTER MAX ATTEMPTS]');
            }
        });
}