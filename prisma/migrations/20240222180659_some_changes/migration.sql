-- AlterTable
ALTER TABLE "row" ALTER COLUMN "word" DROP DEFAULT,
ALTER COLUMN "translation" DROP DEFAULT,
ALTER COLUMN "transcription" SET DEFAULT 'empty';
