"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controllers_1 = require("../controllers/auth-controllers");
const check_auth_1 = __importDefault(require("../middlewares/check-auth"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.post('/signin', [(0, express_validator_1.body)('email').normalizeEmail(), (0, express_validator_1.body)('password').trim()], auth_controllers_1.postSignin);
router.post('/signup', [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email.')
        .custom(value => {
        return user_1.default.findOne({ email: value }).then(user => {
            if (user) {
                return Promise.reject('Email already in use, please select another one.');
            }
        });
    }),
    (0, express_validator_1.body)('password', 'Password should be at least 6 chars')
        .isLength({ min: 6 })
        .trim(),
], auth_controllers_1.postSignup);
router.use(check_auth_1.default);
router.post('/reset', [
    (0, express_validator_1.body)('password', 'New password should be at least 6chars')
        .isLength({ min: 6 })
        .trim(),
    (0, express_validator_1.body)('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
], auth_controllers_1.postReset);
exports.default = router;
