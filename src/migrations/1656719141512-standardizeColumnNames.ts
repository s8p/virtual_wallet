import { MigrationInterface, QueryRunner } from "typeorm";

export class standardizeColumnNames1656719141512 implements MigrationInterface {
    name = 'standardizeColumnNames1656719141512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "transfered_value" TO "transferedValue"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "transferedValue" TO "transfered_value"`);
    }

}
