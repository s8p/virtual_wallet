import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTransactionRelationship1656737228787 implements MigrationInterface {
    name = 'fixTransactionRelationship1656737228787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_71085c7196649651935c47f20da"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_e09f96f7240724d05bb6e6d0fe3"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_71085c7196649651935c47f20da"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3" FOREIGN KEY ("usernameOrigin") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_71085c7196649651935c47f20da" FOREIGN KEY ("usernameRecipient") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_71085c7196649651935c47f20da"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_71085c7196649651935c47f20da" UNIQUE ("usernameRecipient")`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_e09f96f7240724d05bb6e6d0fe3" UNIQUE ("usernameOrigin")`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_71085c7196649651935c47f20da" FOREIGN KEY ("usernameRecipient") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3" FOREIGN KEY ("usernameOrigin") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
