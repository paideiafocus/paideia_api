import { EntityRepository, Repository } from 'typeorm';
import AlunoSimulado from '../models/AlunoSimulado';

@EntityRepository(AlunoSimulado)
class AlunoSimuladosRepository extends Repository<AlunoSimulado> {}

export default AlunoSimuladosRepository;
