import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesCreation1656618553003 implements MigrationInterface {
    name = 'tablesCreation1656618553003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" double precision NOT NULL, CONSTRAINT "PK_74904758e813e401abc3d4261c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "transfered_value" double precision NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "balanceId" uuid NOT NULL, CONSTRAINT "REL_ee0e324a6ec4891a73f04f5f77" UNIQUE ("balanceId"), CONSTRAINT "PK_fe0bb3f6520ee0469504521e710" PRIMARY KEY ("username"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c" FOREIGN KEY ("balanceId") REFERENCES "balances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ee0e324a6ec4891a73f04f5f77c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "balances"`);
    }

}
