import { Request, Response, NextFunction } from 'express';

import { loginSchema, registerSchema } from '#schemas/authSchema';
import AuthService from '#services/authService';

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
