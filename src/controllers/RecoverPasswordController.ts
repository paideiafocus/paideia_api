import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcryptjs';

import { AppError } from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';
import PasswordRecoveryService from '../services/PasswordRecoveryService';
import MailService from '../services/MailService';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class RecoverPasswordController {
  async store(request: Request, response: Response) {
    const { email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('E-mail não encontrado!');
    }

    const passwordRecoveryService = new PasswordRecoveryService();

    const { token } = await passwordRecoveryService.execute({
      userId: user.id,
    });

    const mailService = new MailService();

    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'userRecoverPassword.hbs',
    );
    const variables = {
      name: user.name,
      link: `${process.env.SITE_BASE_URL}/nova-senha/${token}`,
    };

    await mailService.execute({
      to: email,
      subject: 'Esqueceu sua senha?',
      variables,
      templatePath,
    });

    response.status(204).json({});
  }

  async show(request: Request, response: Response) {
    const { token } = request.body;
    const secret = process.env.TOKEN_SECRET_RECOVERY;

    try {
      const decode = verify(token, secret);
      const { sub } = decode as TokenPayload;
      const usersRepository = getCustomRepository(UsersRepository);

      const user = await usersRepository.findOne({ id: sub });

      if (!user) {
        throw new AppError('Invalid token!', 401);
      }
    } catch {
      throw new AppError('Invalid token!', 401);
    }

    return response.json({
      message: 'Valid token',
    });
  }

  async update(request: Request, response: Response) {
    const { newPassword, confirmNewPassword, token } = request.body;
    const secret = process.env.TOKEN_SECRET_RECOVERY;
    const usersRepository = getCustomRepository(UsersRepository);

    try {
      const decode = verify(token, secret);
      const { sub } = decode as TokenPayload;
      const user = await usersRepository.findOne({ id: sub });

      if (!user) {
        throw new AppError('Token inválido!', 401);
      }

      const hashedPassword = await hash(newPassword, 8);
      await usersRepository.update({ id: sub }, { password: hashedPassword });
    } catch {
      throw new AppError('Token inválido!', 401);
    }

    if (newPassword !== confirmNewPassword) {
      throw new AppError('Senhas estão diferente!');
    }

    return response.json({
      message: 'Senha alterada com sucesso!',
    });
  }
}

export default RecoverPasswordController;
