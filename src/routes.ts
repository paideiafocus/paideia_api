import { Router } from 'express';
import SimuladoController from './controllers/SimuladoController';
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
const simuladoController = new SimuladoController();

router.post('/users', usersController.store);
router.get('/users/limit', usersController.index);
router.post('/auth', sessionController.store);
router.post('/password/recover', recoverPasswordController.store);
router.post('/password/validate', recoverPasswordController.show);
router.put('/password/update', recoverPasswordController.update);

router.use(ensureAuthenticated);
router.get('/users/validate/token', usersController.execute);
router.put('/auth/validate', sessionController.update);
router.get('/candidate', subscribersCandidatesController.execute);
router.post('/candidate', subscribersCandidatesController.store);
router.get('/socioeconomic', subscribersSocioeconomicController.execute);
router.post('/socioeconomic', subscribersSocioeconomicController.store);
router.post('/files', subscribersFilesController.store);

// adm
router.get('/files/:userId', subscribersFilesController.index);
router.get('/subscribers', subscribersController.index);
router.get('/subscribers/:userId', subscribersController.show);

// simulados
router.post('/alunosimulado', simuladoController.createAlunoSimulado);
router.get('/alunosimulado', simuladoController.showAlunoSimulado);
router.get('/simuladoq1/:numModelo', simuladoController.getSimuladoQ1);
router.get('/modelo', simuladoController.getNumeroModelo);
router.post('/simulado', simuladoController.storeSimulado);
router.get('/simulado', simuladoController.indexSimulado);
router.post('/cadastraSimulado', simuladoController.cadastraSimulado);
router.get('/cadastraSimulado', simuladoController.listaGabaritos);

// gabaritos
router.get('/gabaritosimples', simuladoController.gabaritoSimples);
router.get('/simuladoadmcompleto', simuladoController.gabaritoCompletoAdm);

export default router;
