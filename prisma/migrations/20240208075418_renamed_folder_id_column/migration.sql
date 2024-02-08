/*
  Warnings:

  - You are about to drop the column `folderId` on the `row` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "row" DROP CONSTRAINT "row_folderId_fkey";

-- AlterTable
ALTER TABLE "row" DROP COLUMN "folderId",
ADD COLUMN     "folder_id" INTEGER;

-- AddForeignKey
ALTER TABLE "row" ADD CONSTRAINT "row_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
