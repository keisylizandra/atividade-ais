import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class PerguntaController {
  // POST /perguntas
  // Registra quem perguntou e o que foi perguntado.
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { consulente, pergunta } = req.body;

      if (!consulente || !pergunta) {
        res.status(400).json({ error: 'Os campos "consulente" e "pergunta" são obrigatórios.' });
        return;
      }

      const novaPergunta = await prisma.pergunta.create({
        data: {
          consulente,
          pergunta,
        },
      });

      res.status(201).json(novaPergunta);
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
      res.status(500).json({ error: 'Erro interno no servidor ao registrar a pergunta.' });
    }
  }
}
