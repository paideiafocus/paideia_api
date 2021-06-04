import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import FilesRepository from '../repositories/SubscribersFilesRepository';
import File from '../models/File';
import UsersRepository from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class SubscribersFilesController {
  async store(request: Request, response: Response) {
    const {
      userToken: { id },
      filesList,
    } = request.body;

    const filesRepository = getCustomRepository(FilesRepository);

    const formattedFiles: [File] = filesList.map((file: File) => ({
      user_id: id,
      ...file,
    }));

    const files = filesRepository.create(formattedFiles);

    await filesRepository.save(files);

    response.status(201).json(files);
  }

  async index(request: Request, response: Response) {
    const {
      userToken: { id },
    } = request.body;
    const { userId } = request.params;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id, status: 'admin' });

    if (!user) {
      throw new AppError('Unauthorized!', 401);
    }

    const filesRepository = getCustomRepository(FilesRepository);

    const files = await filesRepository.find({ user_id: userId });

    response.json(files);
  }
}

// rgCandidato
// cpfCandidato
// historico
// endereco
// cidadao
// bolsa
// foto
// eja

export default SubscribersFilesController;
