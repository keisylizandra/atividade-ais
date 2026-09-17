-- CreateTable
CREATE TABLE "perguntas" (
    "id" TEXT NOT NULL,
    "consulente" VARCHAR(120) NOT NULL,
    "pergunta" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perguntas_pkey" PRIMARY KEY ("id")
);
