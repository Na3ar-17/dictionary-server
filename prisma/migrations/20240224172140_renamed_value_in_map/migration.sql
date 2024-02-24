/*
  Warnings:

  - You are about to drop the column `created_words` on the `statistics` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_words` on the `statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "statistics" DROP COLUMN "created_words",
DROP COLUMN "deleted_words",
ADD COLUMN     "created_rows" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deleted_rows" INTEGER NOT NULL DEFAULT 0;
