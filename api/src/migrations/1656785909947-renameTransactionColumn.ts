import { hashSync } from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class renameTransactionColumn1656785909947
  implements MigrationInterface
{
  name = 'renameTransactionColumn1656785909947'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_71085c7196649651935c47f20da"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "usernameOrigin"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "usernameRecipient"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "userOrigin" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "userRecipient" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_c28253d4168e63026238f7e1ece" FOREIGN KEY ("userOrigin") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_f51bc67d9927b613fe4b718ffee" FOREIGN KEY ("userRecipient") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `INSERT INTO "users" ("name", "username", "password") VALUES ('${
        process.env.DEFAULT_USER_NAME
      }', '${process.env.DEFAULT_USER_USERNAME}', '${hashSync(
        process.env.DEFAULT_USER_PASSWORD,
        10
      )}')`
    )
    await queryRunner.query(
      `INSERT INTO "balances" ("userUsername", "balance") VALUES ('bobito', 100)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_f51bc67d9927b613fe4b718ffee"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_c28253d4168e63026238f7e1ece"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "userRecipient"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "userOrigin"`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "usernameRecipient" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "usernameOrigin" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_71085c7196649651935c47f20da" FOREIGN KEY ("usernameRecipient") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_e09f96f7240724d05bb6e6d0fe3" FOREIGN KEY ("usernameOrigin") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
