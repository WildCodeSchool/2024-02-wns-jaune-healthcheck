import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexCreatedAt1738930034935 implements MigrationInterface {
    name = 'AddIndexCreatedAt1738930034935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b0547d7dbcef2b1f8f626425ce" ON "history" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_7faeaaff3afc4b461ac80a122a" ON "url" ("createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7faeaaff3afc4b461ac80a122a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0547d7dbcef2b1f8f626425ce"`);
    }

}
