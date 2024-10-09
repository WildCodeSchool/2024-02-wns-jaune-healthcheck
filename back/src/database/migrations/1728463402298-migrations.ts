import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728463402298 implements MigrationInterface {
    name = "Migrations1728463402298";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "premium" boolean NOT NULL DEFAULT false`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "premium"`);
    }
}
