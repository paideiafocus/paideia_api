import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSimulados1623625640709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'simulados',
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
            name: 'modelo',
            type: 'tinyint',
          },
          {
            name: 'pergunta',
            type: 'tinyint',
          },
          {
            name: 'selecionado',
            type: 'char',
          },
          {
            name: 'acertou',
            type: 'char',
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
            name: 'FKUserSimulados',
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
    await queryRunner.dropTable('simulados');
  }
}
