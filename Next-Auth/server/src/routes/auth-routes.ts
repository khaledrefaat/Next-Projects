import { Router } from 'express';
import { body } from 'express-validator';
import { postSignin, postSignup } from '../controllers/auth-controllers';
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

export default router;
