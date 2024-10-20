import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729401716093 implements MigrationInterface {
    name = 'Migration1729401716093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`code\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`code\` varchar(255) NOT NULL`);
    }

}
