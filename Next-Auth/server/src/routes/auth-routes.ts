import { Router } from 'express';
import { body } from 'express-validator';
import {
  postSignin,
  postSignup,
  postReset,
} from '../controllers/auth-controllers';
import checkAuth from '../middlewares/check-auth';
import User from '../models/user';

const router = Router();

router.post(
  '/signin',
  [body('email').normalizeEmail(), body('password').trim()],
  postSignin
);

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email.')
      .custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject(
              'Email already in use, please select another one.'
            );
          }
        });
      }),
    body('password', 'Password should be at least 6 chars')
      .isLength({ min: 6 })
      .trim(),
  ],
  postSignup
);

router.use(checkAuth);

router.post(
  '/reset',
  [
    body('password', 'New password should be at least 6chars')
      .isLength({ min: 6 })
      .trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  postReset
);

export default router;
