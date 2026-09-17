# crud-ais-api

Projeto base com **Express**, **TypeScript**, **Prisma ORM** (PostgreSQL) e **Zod** para validação.

Nenhuma entidade de domínio foi configurada — apenas a estrutura base e o endpoint de health check.

## Stack

- **Express 5** — servidor HTTP
- **TypeScript** — tipagem estática
- **Prisma ORM 6** (PostgreSQL) — acesso ao banco de dados
- **Zod** — validação de schemas (env vars, e futuramente DTOs de entrada)
- **Helmet** + **CORS** — segurança básica de headers/origens

## Estrutura de pastas

```
src/
├── controllers/       # Handlers das rotas
├── lib/
│   ├── env.ts          # Validação das variáveis de ambiente (Zod)
│   └── prisma.ts        # Singleton do PrismaClient
├── middlewares/
│   └── error-handler.ts # Tratamento central de erros + 404
├── routes/
│   ├── health.routes.ts
│   └── index.ts        # Agregador de rotas
├── app.ts              # Configuração do Express (middlewares globais)
└── server.ts            # Ponto de entrada / bootstrap

prisma/
└── schema.prisma        # Schema do Prisma (sem models ainda)
```

## Pré-requisitos

- Node.js 20+
- PostgreSQL rodando localmente ou acessível via URL de conexão

## Banco de Dados

O projeto usa `DATABASE_URL` no desenvolvimento local e `DATABASE_URL_REMOTE` no deploy em nuvem.

- Local: `DATABASE_URL` aponta para o Postgres do Docker Compose (`localhost:5432`).
- Nuvem: `DATABASE_URL_REMOTE` aponta para o Postgres gerenciado no deploy, usando a URL do Neon informada na issue.

O app define `DATABASE_URL` automaticamente em produção a partir de `DATABASE_URL_REMOTE`, então o Prisma continua lendo a mesma variável sem precisar de mudança no código de acesso.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie o `.env.example` para `.env` e ajuste as variáveis se necessário:
   ```bash
   cp .env.example .env
   ```

3. Suba o PostgreSQL de desenvolvimento via Docker Compose:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

4. Gere o Prisma Client:
   ```bash
   npm run prisma:generate
   ```

5. (Quando houver models) Rode as migrations:
   ```bash
   npm run prisma:migrate
   ```

6. Suba o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```

7. Teste o health check:
   ```bash
   curl http://localhost:3000/health
   ```

## Scripts disponíveis

| Script                    | Descrição                                          |
|---------------------------|-----------------------------------------------------|
| `npm run dev`              | Sobe o servidor em modo watch (tsx)                 |
| `npm run build`            | Compila o TypeScript para `dist/`                   |
| `npm start`                 | Roda a versão compilada (`dist/server.js`)          |
| `npm run lint`              | Type-check sem gerar arquivos                       |
| `npm run prisma:generate`   | Gera o Prisma Client a partir do schema             |
| `npm run prisma:migrate`    | Cria/aplica migrations (ambiente de desenvolvimento) |
| `npm run prisma:studio`     | Abre o Prisma Studio                                 |

## Próximos passos

- Adicionar models em `prisma/schema.prisma` e rodar `prisma migrate dev`.
- Criar schemas Zod de entrada/saída por entidade (ex: `src/schemas/*.ts`).
- Adicionar novas rotas em `src/routes/` seguindo o padrão de `health.routes.ts`.
