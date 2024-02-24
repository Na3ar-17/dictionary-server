-- AlterTable
ALTER TABLE "statistics" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE DATE;
