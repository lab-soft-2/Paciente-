import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1711245800655 implements MigrationInterface {
    name = 'CreateTables1711245800655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "relacionamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paciente" character varying(255) NOT NULL, "profissional" character varying(255) NOT NULL, "documento" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fim" date NOT NULL, "status" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "UQ_981692dae4fe64e3b0a657101d9" UNIQUE ("documento"), CONSTRAINT "PK_c138a89398074ff877a7e7a4341" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exames" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paciente" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "file" text NOT NULL, CONSTRAINT "PK_a52615f52a6d51d4e23aa0a0b5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paciente" character varying(255) NOT NULL, "profissional" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "file" text NOT NULL, CONSTRAINT "PK_30b7ee230a352e7582842d1dc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paciente" character varying(255) NOT NULL, "profissional" character varying(255) NOT NULL, "documento" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fim" date NOT NULL, "status" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "UQ_c6a1488439a5088afb8d72dc7bb" UNIQUE ("documento"), CONSTRAINT "PK_889a9011f1854a60a6aae1c6d80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "acompanhamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paciente" character varying(255) NOT NULL, "profissional" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_73e84d1164e9b66dc8298147516" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "acompanhamentos"`);
        await queryRunner.query(`DROP TABLE "consultas"`);
        await queryRunner.query(`DROP TABLE "documentos"`);
        await queryRunner.query(`DROP TABLE "exames"`);
        await queryRunner.query(`DROP TABLE "relacionamentos"`);
    }

}
