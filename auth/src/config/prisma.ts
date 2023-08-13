import { PrismaClient } from '@prisma/client';
import config from '@config/config';

let prisma;

if (config.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
