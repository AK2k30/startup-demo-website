import { PrismaClient } from '@prisma/client';

// Ensure that we don't try to redefine the 'prisma' property on the 'global' object,
// which can lead to a TypeError: "Cannot redefine property: prisma"
if (process.env.NODE_ENV !== 'production') {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

const prisma = global.prisma || new PrismaClient();

export default prisma;
