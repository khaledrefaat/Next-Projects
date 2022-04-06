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
const jsonwebtoken_1 = require("jsonwebtoken");
const http_error_1 = __importDefault(require("../models/http-error"));
function checkAuth(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'OPTIONS')
            next();
        try {
            const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
            if (!token) {
                return next(new http_error_1.default('Authentication failed!', 401));
            }
            const decodedToken = (0, jsonwebtoken_1.verify)(token, '#3bX82>YvMjRHcj');
            req.userData = { userId: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId, email: decodedToken.email };
            next();
        }
        catch (err) {
            return next(new http_error_1.default('Authentication failed!', 401));
        }
    });
}
exports.default = checkAuth;
