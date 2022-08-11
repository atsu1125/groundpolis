import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeRepositoryUrl1660197109807 implements MigrationInterface {
    name = 'ChangeRepositoryUrl1660197109807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "meta" SET "repositoryUrl" = 'https://github.com/atsu1125/groundpolis'`);
        await queryRunner.query(`UPDATE "meta" SET "feedbackUrl" = 'https://github.com/atsu1125/groundpolis/issues/new'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`UPDATE "meta" SET "repositoryUrl" = 'https://github.com/groundpolis/groundpolis'`);
      await queryRunner.query(`UPDATE "meta" SET "feedbackUrl" = 'https://github.com/groundpolis/groundpolis/issues/new'`);
    }

}
