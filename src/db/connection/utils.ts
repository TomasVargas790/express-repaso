import { DataSource } from 'typeorm';

let retryAttempts = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

export function connectWithRetry(AppDataSource: DataSource) {

    AppDataSource.initialize()
        .then(() => {
            logger.info('[DATABASE CONNECTED]');
        })
        .catch((error) => {
            logger.warn(`[DATABASE CONNECTION ATTEMPT]>> Attempt ${retryAttempts + 1} of ${MAX_RETRIES}`);
            logger.error('[DATABASE CONNECTION ERROR]>>', error);
            retryAttempts++;

            if (retryAttempts < MAX_RETRIES && !AppDataSource.isInitialized) {
                logger.warn(`[RETRYING CONNECTION]>> Retrying in ${RETRY_DELAY / 1000} seconds...`);
                setTimeout(() => connectWithRetry(AppDataSource), RETRY_DELAY);
            } else {
                logger.error('[FAILED TO CONNECT AFTER MAX ATTEMPTS]');
            }
        });
}