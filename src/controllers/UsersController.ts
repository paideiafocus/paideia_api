import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

class UsersController {
  async store(request: Request, response: Response) {
    const { name, lastname, email, password } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const hashedPassword = await hash(password, 8);

    const code = Math.floor(Math.random() * 99999);
    const user = usersRepository.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      code,
      status: 'common',
    });
    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export default UsersController;