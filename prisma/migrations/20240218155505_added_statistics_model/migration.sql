-- CreateTable
CREATE TABLE "statistics" (
    "id" SERIAL NOT NULL,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "present_of_correct_unswers" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "last_session" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_words" INTEGER NOT NULL DEFAULT 0,
    "deleted_words" INTEGER NOT NULL DEFAULT 0,
    "folder_id" INTEGER,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
