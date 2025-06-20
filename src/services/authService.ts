import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import z from 'zod';

import HttpException from '#models/HttpException';
import prisma from '#prisma';
import { loginSchema, registerSchema } from '#schemas/authSchema';

class AuthService {
  static async register(data: z.infer<typeof registerSchema>) {
    const hash = await argon2.hash(data.password);
    const user = await prisma.user.create({
      data: { fullName: data.fullName, email: data.email, password: hash },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return {
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    };
  }

  static async login(data: z.infer<typeof loginSchema>) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !user.password || !(await argon2.verify(user.password, data.password))) {
      throw new HttpException(400, 'Невалидная пара логин-пароль');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return {
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    };
  }
}

export default AuthService;
