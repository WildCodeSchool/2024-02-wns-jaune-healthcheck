import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldContentTypeHistoryTable1736153283751
    implements MigrationInterface
{
    name = "AddFieldContentTypeHistoryTable1736153283751";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "history" DROP CONSTRAINT "FK_c372a7d47bc824fb157b78121d8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" ADD "content_type" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" ADD CONSTRAINT "FK_c372a7d47bc824fb157b78121d8" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "history" DROP CONSTRAINT "FK_c372a7d47bc824fb157b78121d8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" DROP COLUMN "content_type"`,
        );
        await queryRunner.query(
            `ALTER TABLE "history" ADD CONSTRAINT "FK_c372a7d47bc824fb157b78121d8" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
