import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import CandidatesRepository from '../repositories/SubscribersCandidatesRepository';
import UsersRepository from '../repositories/UsersRepository';

class SubscribersController {
  async index(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id, status: 'admin' });

    if (!user) {
      throw new AppError('Unauthorized!', 401);
    }

    const candidatesRepository = getCustomRepository(CandidatesRepository);

    const userColumns = `u.code, u.enrollment, u.name, u.lastname, u.email, u.status`;
    const candidateColumns = `c.id as candidate_id, c.citizen, c.cpf, c.course, c.birth_date, c.rg, c.phone1`;
    const socioeconomicColumns = `
      s.cinema, s.sports, s.exam_entrance, s.elementary_school, s.age, s.informed, s.internet, s.internet_activity, s.reading_activity, s.read, s.read_qtd, s.place, s.high_school,
      s.live_with_friend, s.live_with_grandfather, s.live_with_couple, s.live_with_mother, s.live_with_father, s.live_with_alone, s.live_qtd, s.live_time, s.live_type, s.study_why,
      s.music, s.no_activity, s.genre, s.tv, s.work_candidate, s.work_father, s.transport`;

    const query = `
      SELECT ${userColumns}, ${candidateColumns}, ${socioeconomicColumns} FROM candidates c
      INNER JOIN users u ON c.user_id = u.id
      INNER JOIN socioeconomic s ON s.user_id = u.id
      WHERE u.status = 'subscriber' OR u.status = 'waiting'`;
    const subscribers = await candidatesRepository.query(query);

    return response.json(subscribers);
  }
}

export default SubscribersController;