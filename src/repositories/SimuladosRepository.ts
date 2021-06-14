import { EntityRepository, Repository } from 'typeorm';
import Simulado from '../models/Simulado';

@EntityRepository(Simulado)
class SimuladosRepository extends Repository<Simulado> {}

export default SimuladosRepository;
