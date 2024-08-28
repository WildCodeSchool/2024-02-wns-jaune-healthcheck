import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCheckFrequencyTable1724667282358 implements MigrationInterface {
    name = 'AddCheckFrequencyTable1724667282358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "check_frequency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interval" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_84dfb2d7ecfd5f2ff449b68235b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`
            INSERT INTO check_frequency (interval) 
            VALUES ('Minute'), ('Heure'), ('Jour'), ('Semaine');
        `);
        await queryRunner.query(`ALTER TABLE "url" ADD "checkFrequencyId" uuid`);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_c90f67595fc4173aacbe574c08e" FOREIGN KEY ("checkFrequencyId") REFERENCES "check_frequency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_c90f67595fc4173aacbe574c08e"`);
        await queryRunner.query(`ALTER TABLE "url" DROP COLUMN "checkFrequencyId"`);
        await queryRunner.query(`DROP TABLE "check_frequency"`);
    }
}
