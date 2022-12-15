import {MigrationInterface, QueryRunner} from "typeorm";

export class disabletrends1671112864090 implements MigrationInterface {
    name = 'disabletrends1671112864090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableTrends" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableTrends"`, undefined);
    }

}
