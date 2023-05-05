import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1683298585994 implements MigrationInterface {
    name = 'UpdateUserTable1683298585994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "auth0id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "auth0id"`);
    }

}
