import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { resolve } from 'path';
import { limitWaitingSubscribers } from '../utils/constants';
import { AppError } from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';
import MailService from '../services/MailService';

class UsersController {
  async store(request: Request, response: Response) {
    const { name, lastname, email, password, phone } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('Já existe um usuário cadastrado com esse e-mail!');
    }

    const hashedPassword = await hash(password, 8);
    const code = Math.floor(Math.random() * 99999);

    const user = usersRepository.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      phone,
      code,
      status: 'common',
      enrollment: 0,
      presence: '',
    });
    await usersRepository.save(user);

    const mailService = new MailService();

    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'userRegistration.hbs',
    );
    const variables = { name, code };

    await mailService.execute({
      to: email,
      subject: 'Confirmação de cadastro',
      variables,
      templatePath,
    });

    delete user.code;
    delete user.password;
    delete user.status;

    response.status(201).json(user);
  }

  async index(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const usersSubscribers = await usersRepository.find({
      status: 'subscriber',
    });

    let isLimited = false;

    const subscribersTotal = usersSubscribers.length - 1;

    if (subscribersTotal === limitWaitingSubscribers) {
      isLimited = true;
    }

    response.status(200).json({ isLimited });
  }

  async execute(request: Request, response: Response) {
    response.status(204).json({});
  }
}

export default UsersController;
