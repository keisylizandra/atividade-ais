import 'dotenv/config';
import { z } from 'zod';

// Validação das variáveis de ambiente com Zod.
// Garante que a aplicação falhe rápido caso alguma variável obrigatória
// esteja ausente ou em formato inválido.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Variáveis de ambiente inválidas:');
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}

export const env = loadEnv();
