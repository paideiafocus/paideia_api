import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

class AuthenticateUserService {
  private secret = process.env.TOKEN_SECRET;

  private expiresIn = process.env.TOKEN_EXPIRES;

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('E-mail ou senha incorretos.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incorretos.');
    }

    const token = sign(
      {
        status: user.status,
      },
      this.secret,
      {
        subject: user.id,
        expiresIn: this.expiresIn,
      },
    );

    return { token, user };
  }
}

export default AuthenticateUserService;
