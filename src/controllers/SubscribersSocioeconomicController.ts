import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SocioeconomicRepository from '../repositories/SubscribersSocioeconomicRepository';
import UsersRepository from '../repositories/UsersRepository';

class SubscribersSocioeconomicController {
  async store(request: Request, response: Response) {
    const {
      userToken: { id },
      cinema,
      sports,
      exam_entrance,
      elementary_school,
      age,
      informed,
      internet,
      internet_activity,
      reading_activity,
      read,
      read_qtd,
      place,
      high_school,
      live_with_friend,
      live_with_grandfather,
      live_with_couple,
      live_with_mother,
      live_with_father,
      live_with_alone,
      live_qtd,
      live_time,
      live_type,
      study_why,
      music,
      no_activity,
      genre,
      tv,
      work_candidate,
      work_study,
      work_father,
      transport,
    } = request.body;

    const socioeconomicRepository = getCustomRepository(
      SocioeconomicRepository,
    );

    const socioeconomic = socioeconomicRepository.create({
      user_id: id,
      cinema,
      sports,
      exam_entrance,
      elementary_school,
      age,
      informed,
      internet,
      internet_activity,
      reading_activity,
      read,
      read_qtd,
      place,
      high_school,
      live_with_friend,
      live_with_grandfather,
      live_with_couple,
      live_with_mother,
      live_with_father,
      live_with_alone,
      live_qtd,
      live_time,
      live_type,
      study_why,
      music,
      no_activity,
      genre,
      tv,
      work_candidate,
      work_study,
      work_father,
      transport,
    });
    await socioeconomicRepository.save(socioeconomic);

    const usersRepository = getCustomRepository(UsersRepository);

    const subscribersUsers = await usersRepository.find({
      status: 'subscriber',
    });

    const subscribersTotal = subscribersUsers.length;
    const enrollment = subscribersTotal + 1935;
    const userUpdate = {
      status: '',
      enrollment,
    };

    if (subscribersTotal <= 79) {
      // lista regular (send mail)
      userUpdate.status = 'subscriber';
    } else if (subscribersTotal > 79 && subscribersTotal <= 119) {
      // lista de espera (send mail)
      userUpdate.status = 'waiting';
    } else {
      // lista cheia (send mail)
    }

    await usersRepository.update({ id }, userUpdate);

    return response.status(201).json({ subscribersUsers, socioeconomic });
  }
}

export default SubscribersSocioeconomicController;
