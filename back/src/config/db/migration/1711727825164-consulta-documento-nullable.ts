import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsultaDocumentoNullable1711727825164 implements MigrationInterface {
    name = 'ConsultaDocumentoNullable1711727825164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" ALTER COLUMN "documento" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" ALTER COLUMN "documento" SET NOT NULL`);
    }

}
