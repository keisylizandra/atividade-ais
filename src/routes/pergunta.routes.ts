import { Router } from 'express';
import { PerguntaController } from '../controllers/pergunta.controller'; // Ajuste o caminho conforme a estrutura do seu projeto

const perguntaRoutes = Router();

// POST /perguntas - Cria uma nova pergunta
perguntaRoutes.post('/', PerguntaController.create);

export default perguntaRoutes;
