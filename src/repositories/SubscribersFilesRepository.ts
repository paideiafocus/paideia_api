import { EntityRepository, Repository } from 'typeorm';
import File from '../models/File';

@EntityRepository(File)
class FilesRepository extends Repository<File> {}

export default FilesRepository;
