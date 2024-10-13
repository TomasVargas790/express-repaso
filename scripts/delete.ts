import '../src/helper'

import { AppDataSource as migrator } from '@db/connection/data-source';

const revertAllMigrations = async () => {
    try {
        await migrator.initialize()
        await migrator.runMigrations({
            transaction: 'all',
        });

        const migrations = await migrator
            .createQueryBuilder()
            .select()
            .from('migrations', 'm')
            .execute();

        while (migrations.length > 0) {
            console.log('Undoing last migration');
            console.log(migrations);
            await migrator.undoLastMigration({ transaction: 'all' });
            migrations.pop();
        }
        logger.debug('[ROLLBACKED EVERY MIGRATION]')
        process.exit(1)
    } catch (error) {
        logger.error('[ERROR ROLLBACKING EVERY MIGRATION]', error)
    }
}
revertAllMigrations()