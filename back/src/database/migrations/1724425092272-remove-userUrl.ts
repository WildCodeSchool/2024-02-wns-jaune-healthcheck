import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserUrl1724425092272 implements MigrationInterface {
    name = 'RemoveUserUrl1724425092272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_url" DROP CONSTRAINT "FK_2d3c4059016f20361da982c5d9d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_url" DROP CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73"`,
        );
        await queryRunner.query(`DROP TABLE "user_url"`);
        await queryRunner.query(`ALTER TABLE "url" ADD "private" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "url" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_2919f59acab0f44b9a244d35bdb"`);
        await queryRunner.query(`ALTER TABLE "url" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "url" DROP COLUMN "private"`);
        await queryRunner.query(
            `CREATE TABLE "user_url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "urlId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_2d3c4059016f20361da982c5d9" UNIQUE ("urlId"), CONSTRAINT "PK_8644584d3620c8fd95111270b75" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_url" ADD CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_url" ADD CONSTRAINT "FK_2d3c4059016f20361da982c5d9d" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

}
