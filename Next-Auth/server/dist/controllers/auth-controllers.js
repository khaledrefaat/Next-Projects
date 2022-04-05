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
exports.postSignup = exports.postSignin = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("../models/http-error"));
const user_1 = __importDefault(require("../models/user"));
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
    res.json({ id: user._id, email: user.email });
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
        res.json({ id: user._id, email: user.email });
    }
    catch (err) {
        console.log(err);
        return next(new http_error_1.default('Something went wrong, please try again later.', 500));
    }
});
exports.postSignup = postSignup;
