import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

 const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");

const adapter = new PrismaMariaDb(url);
const prisma = new PrismaClient({ adapter });

export default prisma;