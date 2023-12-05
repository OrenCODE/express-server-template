import { Prisma, PrismaClient } from '@prisma/client';
import config from '@config/config';
import { DefaultArgs } from '@prisma/client/runtime/library';

let prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

if (config.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
