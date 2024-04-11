-- CreateTable
CREATE TABLE "book_mark" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_mark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "items_count" INTEGER NOT NULL DEFAULT 0,
    "bookMarkId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "row" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "folder_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "folder_id" TEXT NOT NULL,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATE NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "present_of_correct_unswers" INTEGER NOT NULL DEFAULT 0,
    "last_session" TIMESTAMP(3),
    "created_rows" INTEGER NOT NULL DEFAULT 0,
    "deleted_rows" INTEGER NOT NULL DEFAULT 0,
    "rows_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("folder_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_mark_title_key" ON "book_mark"("title");

-- CreateIndex
CREATE UNIQUE INDEX "folder_title_key" ON "folder"("title");

-- CreateIndex
CREATE UNIQUE INDEX "folder_slug_key" ON "folder"("slug");

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_bookMarkId_fkey" FOREIGN KEY ("bookMarkId") REFERENCES "book_mark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "row" ADD CONSTRAINT "row_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
