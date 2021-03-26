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

@Entity('socioeconomic')
class Candidates {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  cinema: boolean;

  @Column()
  sports: boolean;

  @Column()
  exam_entrance: string;

  @Column()
  elementary_school: string;

  @Column()
  age: string;

  @Column()
  informed: string;

  @Column()
  internet: string;

  @Column()
  internet_activity: boolean;

  @Column()
  reading_activity: boolean;

  @Column()
  read: string;

  @Column()
  read_qtd: string;

  @Column()
  place: string;

  @Column()
  high_school: string;

  @Column()
  live_with_friend: boolean;

  @Column()
  live_with_grandfather: boolean;

  @Column()
  live_with_couple: boolean;

  @Column()
  live_with_mother: boolean;

  @Column()
  live_with_father: boolean;

  @Column()
  live_with_alone: boolean;

  @Column()
  live_qtd: string;

  @Column()
  live_time: string;

  @Column()
  live_type: string;

  @Column()
  study_why: string;

  @Column()
  music: boolean;

  @Column()
  no_activity: boolean;

  @Column()
  genre: string;

  @Column()
  tv: boolean;

  @Column()
  work_candidate: string;

  @Column()
  work_study: string;

  @Column()
  work_father: string;

  @Column()
  transport: string;

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

export default Candidates;
