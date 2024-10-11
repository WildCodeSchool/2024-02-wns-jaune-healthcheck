import { MigrationInterface, QueryRunner } from "typeorm";

export class RolesEnum1728550416099 implements MigrationInterface {
    name = "RolesEnum1728550416099";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(
            `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'free', 'premium')`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'free'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'free'`,
        );
    }
}
