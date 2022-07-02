import { MigrationInterface, QueryRunner } from "typeorm";

export class addTransactionRelationship1656718947310 implements MigrationInterface {
    name = 'addTransactionRelationship1656718947310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "usernameOrigin" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_e09f96f7240724d05bb6e6d0fe3" UNIQUE ("usernameOrigin")`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "usernameRecipient" character varying`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_71085c7196649651935c47f20da" UNIQUE ("usernameRecipient")`);
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_2542ee390387d4eef62450349e0"`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "UQ_2542ee390387d4eef62450349e0" UNIQUE ("userUsername")`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_2542ee390387d4eef62450349e0" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3" FOREIGN KEY ("usernameOrigin") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_71085c7196649651935c47f20da" FOREIGN KEY ("usernameRecipient") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_71085c7196649651935c47f20da"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3"`);
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_2542ee390387d4eef62450349e0"`);
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "UQ_2542ee390387d4eef62450349e0"`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_2542ee390387d4eef62450349e0" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_71085c7196649651935c47f20da"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "usernameRecipient"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_e09f96f7240724d05bb6e6d0fe3"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "usernameOrigin"`);
    }

}
