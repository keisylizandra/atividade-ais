import { createApp } from './app';
import { env } from './lib/env';
import { prisma } from './lib/prisma';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${env.PORT}`);
  console.log(`   Health check: http://localhost:${env.PORT}/health`);
});

// Encerramento gracioso da aplicação.
async function shutdown(signal: string): Promise<void> {
  console.log(`\n${signal} recebido. Encerrando servidor...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Servidor encerrado.');
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
