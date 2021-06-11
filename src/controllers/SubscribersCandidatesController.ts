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

    const candidates = await candidatesRepository.find({ user_id: id });

    if (candidates.length !== 0) {
      await candidatesRepository.update(
        { user_id: id },
        {
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
        },
      );

      return response.status(200).json(candidates);
    }

    const newCandidate = candidatesRepository.create({
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
    await candidatesRepository.save(newCandidate);

    return response.status(201).json(newCandidate);
  }
}

export default SubscribersCandidatesController;
