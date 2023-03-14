-- CreateTable
CREATE TABLE "Test" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edad" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "test" JSONB,
    "centro_id" BIGINT NOT NULL,
    "codigo_id" BIGINT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Centro" (
    "id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "codigo_postal" BIGINT NOT NULL,
    "coordenadas" JSON NOT NULL,

    CONSTRAINT "Centro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Codigo" (
    "id" BIGINT NOT NULL,
    "uso" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "centro_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_id" BIGINT NOT NULL,

    CONSTRAINT "Codigo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Centro_id_key" ON "Centro"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Codigo_id_key" ON "Codigo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Codigo_codigo_key" ON "Codigo"("codigo");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_centro_id_fkey" FOREIGN KEY ("centro_id") REFERENCES "Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_codigo_id_fkey" FOREIGN KEY ("codigo_id") REFERENCES "Codigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Codigo" ADD CONSTRAINT "Codigo_centro_id_fkey" FOREIGN KEY ("centro_id") REFERENCES "Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
