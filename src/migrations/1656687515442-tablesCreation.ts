import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesCreation1656687515442 implements MigrationInterface {
    name = 'tablesCreation1656687515442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, CONSTRAINT "PK_fe0bb3f6520ee0469504521e710" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "balances" ("userUsername" character varying NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "REL_2542ee390387d4eef62450349e" UNIQUE ("userUsername"), CONSTRAINT "PK_2542ee390387d4eef62450349e0" PRIMARY KEY ("userUsername"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "transfered_value" double precision NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_2542ee390387d4eef62450349e0" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_2542ee390387d4eef62450349e0"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "balances"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
