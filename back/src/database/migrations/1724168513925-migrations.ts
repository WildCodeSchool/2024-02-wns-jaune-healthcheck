import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724168513925 implements MigrationInterface {
    name = "Migrations1724168513925";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "url" ADD "lastCheckDate" TIMESTAMP NOT NULL DEFAULT now()`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "url" DROP COLUMN "lastCheckDate"`,
        );
    }
}
