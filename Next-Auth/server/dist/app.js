"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use((err, req, res, next) => {
    res.status(err.code || 500);
    res.json({ message: err.message || 'An unknown error occurred!' });
});
mongoose_1.default
    .connect('mongodb://localhost:27017/next-auth')
    .then(() => app.listen(9000))
    .catch(err => console.log(err));
