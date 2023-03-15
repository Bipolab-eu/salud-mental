/*
  Warnings:

  - You are about to drop the column `test_id` on the `Codigo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Codigo" DROP COLUMN "test_id",
ALTER COLUMN "uso" DROP NOT NULL,
ALTER COLUMN "uso" DROP DEFAULT;
DROP SEQUENCE "Codigo_uso_seq";
