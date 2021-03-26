import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import SocioeconomicRepository from '../repositories/SubscribersSocioeconomicRepository';
import UsersRepository from '../repositories/UsersRepository';
import MailService from '../services/MailService';
import User from '../models/User';

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

    const users = await usersRepository.find({
      where: [{ status: 'subscriber' }, { id }],
    });

    const subscribersTotal = users.length - 1;
    const enrollment = subscribersTotal + 1935;
    const userUpdate = {
      status: '',
      enrollment,
    };
    const subscriber = users.find((user: User) => user.id === id);
    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'userSubscriber.hbs',
    );
    const filePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'termo_responsabilidade.pdf',
    );
    const variables = {
      name: subscriber.name,
      enrollment: subscriber.enrollment,
      description: 'lista regular',
    };

    if (subscribersTotal <= 79) {
      userUpdate.status = 'subscriber';
    } else if (subscribersTotal > 79 && subscribersTotal <= 119) {
      userUpdate.status = 'waiting';
      variables.description =
        'lista de espera (lembramos que você precisa participar de todas as etapas igualmente)';
    } else {
      // lista cheia (send mail)
    }

    const mailService = new MailService();
    await mailService.execute({
      to: subscriber.email,
      subject: 'Confirmação de inscrição',
      variables,
      templatePath,
      filePath,
    });

    await usersRepository.update({ id }, userUpdate);

    return response.status(201).json(socioeconomic);
  }
}

export default SubscribersSocioeconomicController;
