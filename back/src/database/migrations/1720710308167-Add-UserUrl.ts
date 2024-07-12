import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserUrl1720710308167 implements MigrationInterface {
    name = 'AddUserUrl1720710308167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "urlId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_2d3c4059016f20361da982c5d9" UNIQUE ("urlId"), CONSTRAINT "PK_8644584d3620c8fd95111270b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_url" ADD CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_url" ADD CONSTRAINT "FK_2d3c4059016f20361da982c5d9d" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_url" DROP CONSTRAINT "FK_2d3c4059016f20361da982c5d9d"`);
        await queryRunner.query(`ALTER TABLE "user_url" DROP CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73"`);
        await queryRunner.query(`DROP TABLE "user_url"`);
    }

}
