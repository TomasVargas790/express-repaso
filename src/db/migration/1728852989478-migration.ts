import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728852989478 implements MigrationInterface {
    name = 'Migration1728852989478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_version\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`categoryId\` int NULL, \`brandId\` int NULL, UNIQUE INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`), UNIQUE INDEX \`IDX_40218d8d4bbf8e38d458869a1c\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_product\` (\`orderId\` int NOT NULL, \`productVersionId\` int NOT NULL, INDEX \`IDX_3fb066240db56c9558a9113943\` (\`orderId\`), INDEX \`IDX_101b97c8cd7e4c2539a339323a\` (\`productVersionId\`), PRIMARY KEY (\`orderId\`, \`productVersionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_version\` ADD CONSTRAINT \`FK_295ef7ef88e264423aadf4cd7f0\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_3fb066240db56c9558a91139431\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_101b97c8cd7e4c2539a339323a9\` FOREIGN KEY (\`productVersionId\`) REFERENCES \`product_version\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_101b97c8cd7e4c2539a339323a9\``);
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_3fb066240db56c9558a91139431\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`product_version\` DROP FOREIGN KEY \`FK_295ef7ef88e264423aadf4cd7f0\``);
        await queryRunner.query(`DROP INDEX \`IDX_101b97c8cd7e4c2539a339323a\` ON \`order_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fb066240db56c9558a9113943\` ON \`order_product\``);
        await queryRunner.query(`DROP TABLE \`order_product\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_40218d8d4bbf8e38d458869a1c\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f468ae5696f07da025138e38f\` ON \`brand\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`product_version\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
