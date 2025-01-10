import { MigrationInterface, QueryRunner } from "typeorm";

export class UrlDeleteCascade1736522105212 implements MigrationInterface {
    name = 'UrlDeleteCascade1736522105212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_c90f67595fc4173aacbe574c08e"`);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_c90f67595fc4173aacbe574c08e" FOREIGN KEY ("checkFrequencyId") REFERENCES "check_frequency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url" DROP CONSTRAINT "FK_c90f67595fc4173aacbe574c08e"`);
        await queryRunner.query(`ALTER TABLE "url" ADD CONSTRAINT "FK_c90f67595fc4173aacbe574c08e" FOREIGN KEY ("checkFrequencyId") REFERENCES "check_frequency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
