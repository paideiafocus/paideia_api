import { EntityRepository, Repository } from 'typeorm';
import Candidate from '../models/Candidate';

@EntityRepository(Candidate)
class CandidatesRepository extends Repository<Candidate> {}

export default CandidatesRepository;
