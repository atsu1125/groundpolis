import {MigrationInterface, QueryRunner} from "typeorm";

export class userProfile1639580990395 implements MigrationInterface {
    name = 'userProfile1639580990395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "carefulRemote" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "carefulRemote"`);
    }

}
