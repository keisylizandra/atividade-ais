import { Request, Response } from 'express';
import { prisma } from '@/lib/prisma';

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
  // PUT /perguntas/:id
  static async update(req: Request, res: Response): Promise<void> {
    try {
      // Força o TypeScript a entender que id é uma string
      const id = req.params.id as string;
      const data = req.body;

      if (!data || Object.keys(data).length === 0) {
        res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
        return;
      }

      const perguntaAtualizada = await prisma.pergunta.update({
        where: { id },
        data,
      });

      res.status(200).json(perguntaAtualizada);
    } catch (error: any) {
      console.error('Erro ao atualizar a pergunta:', error);

      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Pergunta não encontrada para atualização.' });
        return;
      }

      res.status(500).json({ error: 'Erro interno no servidor ao atualizar a pergunta.' });
    }
  }

}
