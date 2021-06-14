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

@Entity('simulados')
class Simulado {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  modelo: number;

  @Column()
  pergunta: number;

  @Column()
  selecionado: string;

  @Column()
  acertou: string;

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

export default Simulado;
