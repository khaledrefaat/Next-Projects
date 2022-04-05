import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import User from '../models/user';

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

  res.json({ id: user._id, email: user.email });
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
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, please try again later.', 500)
    );
  }
};
