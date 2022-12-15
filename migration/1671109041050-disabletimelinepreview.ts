import {MigrationInterface, QueryRunner} from "typeorm";

export class disabletimelinepreview1671109041050 implements MigrationInterface {
    name = 'disabletimelinepreview1671109041050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableTimelinePreview" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableTimelinePreview"`, undefined);
    }

}
