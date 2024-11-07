import { MigrationInterface, QueryRunner } from "typeorm";

export class Notification1728629185397 implements MigrationInterface {
    name = 'Notification1728629185397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_read" boolean NOT NULL, "content" text NOT NULL, "userId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history" ADD "notificationId" uuid`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "UQ_c372a7d47bc824fb157b78121d8" UNIQUE ("notificationId")`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_c372a7d47bc824fb157b78121d8" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_c372a7d47bc824fb157b78121d8"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "UQ_c372a7d47bc824fb157b78121d8"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "notificationId"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
