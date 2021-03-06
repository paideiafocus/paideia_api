import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import createConnection from './database';
import router from './routes';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(cors()); // ALLOW ONLY FROM URL REQUEST
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  },
);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server open, port: ${port}`));
