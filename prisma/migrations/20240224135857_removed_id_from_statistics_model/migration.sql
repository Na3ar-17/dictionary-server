/*
  Warnings:

  - The primary key for the `statistics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `statistics` table. All the data in the column will be lost.
  - Made the column `folder_id` on table `statistics` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "statistics" DROP CONSTRAINT "statistics_folder_id_fkey";

-- AlterTable
ALTER TABLE "statistics" DROP CONSTRAINT "statistics_pkey",
DROP COLUMN "id",
ALTER COLUMN "folder_id" SET NOT NULL,
ADD CONSTRAINT "statistics_pkey" PRIMARY KEY ("folder_id");

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
