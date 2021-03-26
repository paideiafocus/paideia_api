import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CandidatesRepository from '../repositories/SubscribersCandidatesRepository';

class SubscribersCandidatesController {
  async store(request: Request, response: Response) {
    const {
      userToken: { id },
      citizen,
      birth_city,
      cpf,
      course,
      birth_date,
      state,
      fullname,
      rg,
      phone1,
      phone2,
    } = request.body;

    const candidatesRepository = getCustomRepository(CandidatesRepository);

    const candidate = candidatesRepository.create({
      user_id: id,
      citizen,
      birth_city,
      cpf,
      course,
      birth_date,
      state,
      fullname,
      rg,
      phone1,
      phone2,
    });
    await candidatesRepository.save(candidate);

    return response.status(201).json(candidate);
  }
}

export default SubscribersCandidatesController;
