import {MigrationInterface, QueryRunner} from "typeorm";

export class NoteUpdatedAt1695901659683 implements MigrationInterface {
    name = 'NoteUpdatedAt1695901659683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "updatedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updatedAt"`);
    }

}
