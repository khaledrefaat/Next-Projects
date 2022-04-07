"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReset = exports.postSignup = exports.postSignin = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("../models/http-error"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const myValidationResult = (0, express_validator_1.validationResult)(req);
    if (!myValidationResult.isEmpty()) {
        return next(new http_error_1.default(myValidationResult.array()[0].msg, 422));
    }
    const { email, password } = req.body;
    let user;
    try {
        user = yield user_1.default.findOne({ email });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
    if (!user || user.password !== password) {
        return next(new http_error_1.default('Incorrect email or password.', 403));
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, '#3bX82>YvMjRHcj', { expiresIn: '1h' });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
    res.json({ userId: user._id, email: user.email, token });
});
exports.postSignin = postSignin;
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const myValidationResult = (0, express_validator_1.validationResult)(req);
    if (!myValidationResult.isEmpty()) {
        return next(new http_error_1.default(myValidationResult.array()[0].msg, 422));
    }
    const { email, password } = req.body;
    const user = new user_1.default({ email, password });
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, '#3bX82>YvMjRHcj', { expiresIn: '1h' });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
    res.json({ userId: user._id, email: user.email, token });
});
exports.postSignup = postSignup;
const postReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const myValidationResult = (0, express_validator_1.validationResult)(req);
    if (!myValidationResult.isEmpty()) {
        console.log(myValidationResult.array());
        return next(new http_error_1.default(myValidationResult.array()[0].msg, 422));
    }
    const { password } = req.body;
    try {
        const user = yield user_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.userData) === null || _a === void 0 ? void 0 : _a.userId);
        user.password = password;
        yield user.save;
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, '#3bX82>YvMjRHcj', { expiresIn: '1h' });
        res.json({ userId: user._id, email: user.email, token });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
});
exports.postReset = postReset;
