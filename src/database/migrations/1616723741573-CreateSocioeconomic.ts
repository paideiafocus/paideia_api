import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSocioeconomic1616723741573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'socioeconomic',
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
            name: 'cinema',
            type: 'boolean',
          },
          {
            name: 'sports',
            type: 'boolean',
          },
          {
            name: 'exam_entrance',
            type: 'varchar',
          },
          {
            name: 'elementary_school',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'varchar',
          },
          {
            name: 'informed',
            type: 'varchar',
          },
          {
            name: 'internet',
            type: 'varchar',
          },
          {
            name: 'internet_activity',
            type: 'boolean',
          },
          {
            name: 'reading_activity',
            type: 'boolean',
          },
          {
            name: 'read',
            type: 'varchar',
          },
          {
            name: 'read_qtd',
            type: 'varchar',
          },
          {
            name: 'place',
            type: 'varchar',
          },
          {
            name: 'high_school',
            type: 'varchar',
          },
          {
            name: 'live_with_friend',
            type: 'boolean',
          },
          {
            name: 'live_with_grandfather',
            type: 'boolean',
          },
          {
            name: 'live_with_couple',
            type: 'boolean',
          },
          {
            name: 'live_with_mother',
            type: 'boolean',
          },
          {
            name: 'live_with_father',
            type: 'boolean',
          },
          {
            name: 'live_with_alone',
            type: 'boolean',
          },
          {
            name: 'live_qtd',
            type: 'varchar',
          },
          {
            name: 'live_time',
            type: 'varchar',
          },
          {
            name: 'live_type',
            type: 'varchar',
          },
          {
            name: 'study_why',
            type: 'varchar',
          },
          {
            name: 'music',
            type: 'boolean',
          },
          {
            name: 'no_activity',
            type: 'boolean',
          },
          {
            name: 'genre',
            type: 'varchar',
          },
          {
            name: 'tv',
            type: 'boolean',
          },
          {
            name: 'work_candidate',
            type: 'varchar',
          },
          {
            name: 'work_study',
            type: 'varchar',
          },
          {
            name: 'work_father',
            type: 'varchar',
          },
          {
            name: 'transport',
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
          {
            name: 'participate_ead',
            type: 'varchar',
          },
          {
            name: 'understand_ead',
            type: 'varchar',
          },
          {
            name: 'local_quarantine',
            type: 'varchar',
          },
          {
            name: 'unprotected_people',
            type: 'varchar',
          },
          {
            name: 'responsibilities',
            type: 'varchar',
          },
             {
            name: 'smartphone',
            type: 'varchar',
          },
          {
            name: 'internet_smartphone',
            type: 'varchar',
          },
          {
            name: 'internet_smartphone_limit',
            type: 'varchar',
          },
          {
            name: 'equips',
            type: 'varchar',
          },
             {
            name: 'pc_shared',
            type: 'varchar',
          },
          {
            name: 'study_local',
            type: 'varchar',
          },
          {
            name: 'internet_quality',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserSocioeconomic',
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
    await queryRunner.dropTable('socioeconomic');
  }
}
