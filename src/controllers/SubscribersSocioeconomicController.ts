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
      participate_ead,
      understand_ead,
      local_quarantine,
      unprotected_people,
      responsibilities,
      smartphone,
      internet_smartphone,
      internet_smartphone_limit,
      equips,
      pc_shared,
      study_local,
      internet_quality,
    } = request.body;

    const bodyData = {
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
      participate_ead,
      understand_ead,
      local_quarantine,
      unprotected_people,
      responsibilities,
      smartphone,
      internet_smartphone,
      internet_smartphone_limit,
      equips,
      pc_shared,
      study_local,
      internet_quality,
    };

    const socioeconomicRepository = getCustomRepository(
      SocioeconomicRepository,
    );

    const socioeconomics = await socioeconomicRepository.find({ user_id: id });

    if (socioeconomics.length !== 0) {
      await socioeconomicRepository.update({ user_id: id }, bodyData);
      return response.status(200).json(socioeconomics);
    }

    const socioeconomic = socioeconomicRepository.create({
      user_id: id,
      ...bodyData,
    });
    await socioeconomicRepository.save(socioeconomic);

    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find({
      where: [{ status: 'subscriber' }, { id }],
    });

    const subscribersTotal = users.length - 1;
    const enrollment = subscribersTotal + 2209;
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

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const semester = month < 6 ? 'primeiro' : 'segundo';

    const variables = {
      name: subscriber.name,
      enrollment,
      description: 'lista regular',
      year,
      semester,
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
