import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import FilesRepository from '../repositories/SubscribersFilesRepository';
import File from '../models/File';

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
