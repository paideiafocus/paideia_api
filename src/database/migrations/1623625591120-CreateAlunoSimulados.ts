import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAlunoSimulados1623625591120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'alunosimulados',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '190',
            isPrimary: true,
          },
          {
            name: 'user_id', // idUser
            type: 'varchar',
            length: '190',
          },

          {
            name: 'horaInicio',
            type: 'varchar',
          },
          {
            name: 'horaFimMin',
            type: 'varchar',
          },
          {
            name: 'horaFimMax',
            type: 'varchar',
          },
          {
            name: 'horaEnvio',
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
        foreignKeys: [
          {
            name: 'FKUserAlunoSimulado',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('alunosimulados');
  }
}
