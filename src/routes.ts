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

export default router;
