import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ReqUserData, User } from '../interface/user';
import HttpError from '../models/http-error';

export default async function checkAuth(
  req: ReqUserData,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return next(new HttpError('Authentication failed!', 401));
    }

    const decodedToken = verify(token, '#3bX82>YvMjRHcj') as User;
    req.userData = { userId: decodedToken?.userId, email: decodedToken.email };
    next();
  } catch (err) {
    return next(new HttpError('Authentication failed!', 401));
  }
}
