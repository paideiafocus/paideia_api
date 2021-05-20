import { Router } from 'express';
import RecoverPasswordController from './controllers/RecoverPasswordController';
import SessionController from './controllers/SessionController';
import SubscribersCandidatesController from './controllers/SubscribersCandidatesController';
import SubscribersController from './controllers/SubscribersController';
import SubscribersFilesController from './controllers/SubscribersFilesController';
import SubscribersSocioeconomicController from './controllers/SubscribersSocioeconomicController';
import UsersController from './controllers/UsersController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

const router = Router();

const usersController = new UsersController();
const sessionController = new SessionController();
const subscribersCandidatesController = new SubscribersCandidatesController();
const subscribersSocioeconomicController = new SubscribersSocioeconomicController();
const subscribersFilesController = new SubscribersFilesController();
const subscribersController = new SubscribersController();
const recoverPasswordController = new RecoverPasswordController();

router.post('/users', usersController.store);
router.post('/auth', sessionController.store);
router.post('/password/recover', recoverPasswordController.store);
router.post('/password/validate', recoverPasswordController.show);
router.put('/password/update', recoverPasswordController.update);

router.use(ensureAuthenticated);
router.get('/users/validate/token', usersController.execute);
router.put('/auth/validate', sessionController.update);
router.post('/candidate', subscribersCandidatesController.store);
router.post('/socioeconomic', subscribersSocioeconomicController.store);
router.post('/files', subscribersFilesController.store);

router.get('/subscribers', subscribersController.index);

export default router;
