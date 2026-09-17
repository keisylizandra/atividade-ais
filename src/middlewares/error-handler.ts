import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

// Middleware central de tratamento de erros.
// Deve ser registrado por último, após todas as rotas.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Erro de validação',
      issues: err.issues,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
}

// Middleware para rotas não encontradas.
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ message: `Rota ${req.method} ${req.originalUrl} não encontrada` });
}
