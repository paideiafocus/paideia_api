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

    const query = `SELECT * FROM candidates INNER JOIN users ON candidates.user_id = users.id
      WHERE users.status = 'subscriber' OR users.status = 'waiting'`;

    const subscribers = await candidatesRepository.query(query);

    return response.json(subscribers);
  }
}

export default SubscribersController;
