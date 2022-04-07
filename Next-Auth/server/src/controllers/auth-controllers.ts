import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { ReqUserData } from '../interface/user';

export const postSignin: RequestHandler = async (req, res, next) => {
  const myValidationResult = validationResult(req);
  if (!myValidationResult.isEmpty()) {
    return next(new HttpError(myValidationResult.array()[0].msg, 422));
  }

  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }

  if (!user || user.password !== password) {
    return next(new HttpError('Incorrect email or password.', 403));
  }

  let token;

  try {
    token = jwt.sign(
      { userId: user._id, email: user.email },
      '#3bX82>YvMjRHcj',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }

  res.json({ userId: user._id, email: user.email, token });
};

export const postSignup: RequestHandler = async (req, res, next) => {
  const myValidationResult = validationResult(req);

  if (!myValidationResult.isEmpty()) {
    return next(new HttpError(myValidationResult.array()[0].msg, 422));
  }

  const { email, password } = req.body;

  const user = new User({ email, password });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }

  let token;

  try {
    token = jwt.sign(
      { userId: user._id, email: user.email },
      '#3bX82>YvMjRHcj',
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }
  res.json({ userId: user._id, email: user.email, token });
};

export const postReset: RequestHandler = async (
  req: ReqUserData,
  res,
  next
) => {
  const myValidationResult = validationResult(req);

  if (!myValidationResult.isEmpty()) {
    console.log(myValidationResult.array());
    return next(new HttpError(myValidationResult.array()[0].msg, 422));
  }

  const { password } = req.body;

  try {
    const user = await User.findById(req?.userData?.userId);
    user.password = password;
    await user.save;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      '#3bX82>YvMjRHcj',
      { expiresIn: '1h' }
    );
    res.json({ userId: user._id, email: user.email, token });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }
};
