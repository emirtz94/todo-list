import { PrismaClient } from '../generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "rootpassword",
  database: "todoapp",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter })


export { prisma };
