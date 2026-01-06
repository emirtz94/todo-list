import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email }});

    if(!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async register(email: string, password: string, name: string) {
    const existing = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      throw new Error('Email already registered');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
      },
    });
  }
}

export const authService = new AuthService();
