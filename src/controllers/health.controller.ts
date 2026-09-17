import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

// GET /health
// Verifica se a aplicação está no ar e se a conexão com o banco está ok.
export async function healthCheck(_req: Request, res: Response): Promise<void> {
  const startedAt = process.uptime();

  let database: 'up' | 'down' = 'down';
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = 'up';
  } catch {
    database = 'down';
  }

  const status = database === 'up' ? 200 : 503;

  res.status(status).json({
    status: database === 'up' ? 'ok' : 'degraded',
    uptime: startedAt,
    timestamp: new Date().toISOString(),
    services: {
      database,
    },
  });
}
