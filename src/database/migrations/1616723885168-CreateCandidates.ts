import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCandidates1616723885168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '190',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '190',
          },
          {
            name: 'citizen',
            type: 'varchar',
          },
          {
            name: 'birth_city',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'course',
            type: 'varchar',
          },
          {
            name: 'birth_date',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'rg',
            type: 'varchar',
          },
          {
            name: 'phone1',
            type: 'varchar',
          },
          {
            name: 'phone2',
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
            name: 'FKUserCandidate',
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
    await queryRunner.dropTable('candidates');
  }
}
