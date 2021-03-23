import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import createConnection from './database';
import router from './routes';
// AppError

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log('Server open...'));
