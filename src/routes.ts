import { Router } from 'express';
import SessionController from './controllers/SessionController';
import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

const router = Router();

const usersController = new UsersController();
const sessionController = new SessionController();

router.post('/users', usersController.store);
router.post('/auth', sessionController.store);

router.use(ensureAuthenticated);
router.put('/auth/validate', sessionController.update);
router.post('/socioeconomic', (request, response) => {
  // const mailService = new MailService();
  //   const npsPath = resolve(
  //     __dirname,
  //     '..',
  //     'views',
  //     'emails',
  //     'userRegistration.hbs',
  //   );
  //   const filePath = resolve(
  //     __dirname,
  //     '..',
  //     'views',
  //     'emails',
  //     'termo_responsabilidade.pdf',
  //   );
  //   const variables = {
  //     name,
  //     enrollment: user.enrollment,
  //     description: 'lista regular',
  //   };
  //   const variables2 = {
  //     name,
  //     enrollment: user.enrollment,
  //     description:
  //       'lista de espera (lembramos que você precisa participar de todas as etapas igualmente)',
  //   };
  //   await mailService.execute(
  //     email,
  //     'Confirmação de inscrição',
  //     variables,
  //     npsPath,
  //     filePath,
  //   );
  //   await mailService.execute(
  //     email,
  //     'Confirmação de inscrição',
  //     variables2,
  //     npsPath,
  //     filePath,
  //   );
  return response.json({ message: 'okay' });
});

export default router;
