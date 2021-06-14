import { EntityRepository, Repository } from 'typeorm';
import Gabaritos from '../models/Gabaritos';

@EntityRepository(Gabaritos)
class GabaritosRepository extends Repository<Gabaritos> {}

export default GabaritosRepository;
