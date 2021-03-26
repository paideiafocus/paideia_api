import { EntityRepository, Repository } from 'typeorm';
import Socioeconomic from '../models/Socioeconomic';

@EntityRepository(Socioeconomic)
class SubscribersSocioeconomicRepository extends Repository<Socioeconomic> {}

export default SubscribersSocioeconomicRepository;
