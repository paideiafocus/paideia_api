import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  userId: string;
}

interface IResponse {
  token: string;
}

class PasswordRecoveryService {
  private secret = process.env.TOKEN_SECRET_RECOVERY;

  private expiresIn = process.env.TOKEN_EXPIRES_RECOVERY;

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const token = sign({}, this.secret, {
      subject: userId,
      expiresIn: this.expiresIn,
    });

    return { token };
  }
}

export default PasswordRecoveryService;
