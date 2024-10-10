import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoles1728546932904 implements MigrationInterface {
    name = "UserRoles1728546932904";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "premium" TO "role"`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'free'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD "role" boolean NOT NULL DEFAULT false`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "role" TO "premium"`,
        );
    }
}
