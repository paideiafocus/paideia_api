import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGabaritos1623625609743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gabaritos',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '190',
            isPrimary: true,
          },
          {
            name: 'modelo',
            type: 'tinyint',
          },
          {
            name: 'materia',
            type: 'varchar',
          },
          {
            name: 'pergunta',
            type: 'tinyint',
          },
          {
            name: 'enunciado',
            type: 'text',
          },
          {
            name: 'resp_a',
            type: 'text',
          },
          {
            name: 'resp_b',
            type: 'text',
          },
          {
            name: 'resp_c',
            type: 'text',
          },
          {
            name: 'resp_d',
            type: 'text',
          },
          {
            name: 'resp_e',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'correta',
            type: 'char',
          },
          {
            name: 'img',
            type: 'varchar',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gabaritos');
  }
}
