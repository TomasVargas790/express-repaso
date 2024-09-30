import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueBrandNameCode1727676211839 implements MigrationInterface {
    name = 'UniqueBrandNameCode1727676211839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brand\` ADD UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD UNIQUE INDEX \`IDX_40218d8d4bbf8e38d458869a1c\` (\`code\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brand\` DROP INDEX \`IDX_40218d8d4bbf8e38d458869a1c\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP INDEX \`IDX_5f468ae5696f07da025138e38f\``);
    }

}
