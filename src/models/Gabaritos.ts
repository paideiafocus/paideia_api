import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('gabaritos')
class Gabaritos {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  modelo: number;

  @Column()
  materia: string;

  @Column()
  pergunta: number;

  @Column()
  enunciado: string;

  @Column()
  resp_a: string;

  @Column()
  resp_b: string;

  @Column()
  resp_c: string;

  @Column()
  resp_d: string;

  @Column()
  resp_e: string;

  @Column()
  correta: string;

  @Column()
  img: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Gabaritos;
