import { Router } from 'express';
import healthRoutes from './health.routes';
import perguntaRoutes from './pergunta.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/perguntas', perguntaRoutes)

export default router;
