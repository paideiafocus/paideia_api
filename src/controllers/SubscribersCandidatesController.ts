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
      school_bus,
    } = request.body;

    const candidatesRepository = getCustomRepository(CandidatesRepository);

    const candidates = await candidatesRepository.find({ user_id: id });

    if (candidates.length !== 0) {
      await candidatesRepository.update(
        { user_id: id },
        {
          citizen,
          birth_city: birth_city || '',
          cpf,
          course,
          birth_date,
          state: state || '',
          fullname,
          rg,
          phone1,
          phone2: phone2 || '',
          school_bus,
        },
      );

      return response.status(200).json(candidates);
    }

    const newCandidate = candidatesRepository.create({
      user_id: id,
      citizen,
      birth_city: birth_city || '',
      cpf,
      course,
      birth_date,
      state: state || '',
      fullname,
      rg,
      phone1,
      phone2: phone2 || '',
      school_bus,
    });
    await candidatesRepository.save(newCandidate);

    return response.status(201).json(newCandidate);
  }

  async execute(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;

    const candidatesRepository = getCustomRepository(CandidatesRepository);

    const candidates = await candidatesRepository.find({ user_id: id });

    if (candidates.length === 0) {
      return response.status(204).json({});
    }

    const [candidate] = candidates;

    return response.status(200).json(candidate);
  }
}

export default SubscribersCandidatesController;
