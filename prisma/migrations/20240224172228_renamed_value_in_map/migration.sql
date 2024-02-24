/*
  Warnings:

  - You are about to drop the column `words_count` on the `statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "statistics" DROP COLUMN "words_count",
ADD COLUMN     "rows_count" INTEGER NOT NULL DEFAULT 0;
