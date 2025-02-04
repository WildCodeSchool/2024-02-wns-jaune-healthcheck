import { MigrationInterface, QueryRunner } from "typeorm";

export class NotifFrequency1736519806535 implements MigrationInterface {
    name = "NotifFrequency1736519806535";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "notif_frequency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interval" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_810b8a7629ea44b00ed877356f3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`
            INSERT INTO notif_frequency (interval)
            VALUES ('Jour'), ('Semaine'), ('Mois');
        `);
        await queryRunner.query(
            `ALTER TABLE "user" ADD "notifFrequencyId" uuid`,
        );
        await queryRunner.query(`
            ALTER TABLE "user" ADD CONSTRAINT "FK_0bae5a20f203f13ff14fe9f5148"
            FOREIGN KEY ("notifFrequencyId")
            REFERENCES "notif_frequency"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_0bae5a20f203f13ff14fe9f5148"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "notifFrequencyId"`,
        );
        await queryRunner.query(`DROP TABLE "notif_frequency"`);
    }
}
