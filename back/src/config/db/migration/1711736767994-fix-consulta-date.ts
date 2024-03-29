import { MigrationInterface, QueryRunner } from "typeorm";

export class FixConsultaDate1711736767994 implements MigrationInterface {
    name = 'FixConsultaDate1711736767994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" DROP COLUMN "fim"`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD "inicio" date`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD "duracao" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" DROP COLUMN "duracao"`);
        await queryRunner.query(`ALTER TABLE "consultas" DROP COLUMN "inicio"`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD "fim" date NOT NULL`);
    }

}
