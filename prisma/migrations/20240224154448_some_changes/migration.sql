-- AlterTable
ALTER TABLE "statistics" ALTER COLUMN "last_session" DROP NOT NULL,
ALTER COLUMN "last_session" SET DEFAULT CURRENT_TIMESTAMP;
