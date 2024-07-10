import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDbUrlHistoryUser1720618090787 implements MigrationInterface {
    name = 'InitDbUrlHistoryUser1720618090787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "status_code" integer NOT NULL, "response" text NOT NULL, "urlId" uuid, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(55) NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_9b8293dadd944e8ad0dc4e8ecaa" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_9b8293dadd944e8ad0dc4e8ecaa"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "url"`);
        await queryRunner.query(`DROP TABLE "history"`);
    }

}
