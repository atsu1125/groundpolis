import {MigrationInterface, QueryRunner} from "typeorm";

export class disableprofiledirectory1671111402070 implements MigrationInterface {
    name = 'disableprofiledirectory1671111402070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableProfileDirectory" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableProfileDirectory"`, undefined);
    }

}
