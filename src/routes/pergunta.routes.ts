import { Router } from 'express';
import { PerguntaController } from '@/controllers/pergunta.controller';

const perguntaRoutes = Router();

// POST /perguntas - Cria uma nova pergunta
perguntaRoutes.post('/', PerguntaController.create);
perguntaRoutes.put('/:id', PerguntaController.update);

export default perguntaRoutes;
