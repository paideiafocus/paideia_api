import { EntityRepository, Repository } from 'typeorm';
import Candidates from '../models/Candidates';

@EntityRepository(Candidates)
class CandidatesRepository extends Repository<Candidates> {}

export default CandidatesRepository;
