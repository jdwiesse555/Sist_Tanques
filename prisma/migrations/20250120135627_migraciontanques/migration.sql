-- CreateTable
CREATE TABLE "listametricas" (
    "id" SERIAL NOT NULL,
    "metrica" TEXT NOT NULL,
    "comentario" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listametricas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metricas" (
    "id" SERIAL NOT NULL,
    "metrica" INTEGER NOT NULL,
    "medida" TEXT NOT NULL,
    "vol_bbls" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metricas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tanques" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "metrica" INTEGER NOT NULL,
    "capacidad" DECIMAL(65,30) NOT NULL,
    "HEIGHT_PIES" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tanques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediciones" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tanque" INTEGER NOT NULL,
    "metrica" INTEGER NOT NULL,
    "agua_pies" TEXT NOT NULL,
    "agua_pul" TEXT NOT NULL,
    "crudo_pies" TEXT NOT NULL,
    "crudo_pul" TEXT NOT NULL,
    "stock_agua" DECIMAL(65,30) NOT NULL,
    "stock_crudo" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mediciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "metricas" ADD CONSTRAINT "metricas_metrica_fkey" FOREIGN KEY ("metrica") REFERENCES "listametricas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tanques" ADD CONSTRAINT "tanques_metrica_fkey" FOREIGN KEY ("metrica") REFERENCES "listametricas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediciones" ADD CONSTRAINT "mediciones_metrica_fkey" FOREIGN KEY ("metrica") REFERENCES "listametricas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediciones" ADD CONSTRAINT "mediciones_tanque_fkey" FOREIGN KEY ("tanque") REFERENCES "tanques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
