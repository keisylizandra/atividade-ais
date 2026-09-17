import './env';
import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias do PrismaClient em ambiente de desenvolvimento
// (hot-reload cria novos módulos a cada mudança).
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma = global.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}

export default prisma;
