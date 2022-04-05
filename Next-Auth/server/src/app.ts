import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import HttpError from './models/http-error';
import authRoutes from './routes/auth-routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500);
  res.json({ message: err.message || 'An unknown error occurred!' });
});

mongoose
  .connect('mongodb://localhost:27017/next-auth')
  .then(() => app.listen(9000))
  .catch(err => console.log(err));
