import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { token } = await authenticateUser.execute({ email, password });

    return response.json({ token });
  }

  async update(request: Request, response: Response) {
    const {
      userToken: { id },
      code,
    } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ id, code });

    if (!user) {
      throw new AppError('Invalid code!');
    }

    await usersRepository.update({ id }, { status: 'active' });

    return response.json({
      message: 'code updated successfully',
      status: 'active',
    });
  }
}

export default SessionController;
