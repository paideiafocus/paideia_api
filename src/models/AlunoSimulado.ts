import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import User from './User';

@Entity('alunosimulados')
class AlunoSimulado {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  horaInicio: string;

  @Column()
  horaFimMin: string;

  @Column()
  horaFimMax: string;

  @Column()
  horaEnvio: string;

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

export default AlunoSimulado;
