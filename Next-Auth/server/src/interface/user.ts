import { Request } from 'express';

export interface User {
  userId: string;
  email: string;
}

export interface ReqUserData extends Request {
  userData?: User;
}
