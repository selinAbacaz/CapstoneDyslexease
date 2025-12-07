/*
  Warnings:

  - You are about to drop the `FilesPreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LetterSwap" DROP CONSTRAINT "LetterSwap_file_pref_cuid_fkey";

-- DropTable
DROP TABLE "FilesPreference";

-- CreateTable
CREATE TABLE "FilePreference" (
    "file_pref_cuid" TEXT NOT NULL,
    "file_cuid" TEXT NOT NULL,
    "text_color_hex" TEXT,
    "background_color_hex" TEXT,
    "text_spacing" INTEGER,
    "font_size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilePreference_pkey" PRIMARY KEY ("file_pref_cuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilePreference_file_cuid_key" ON "FilePreference"("file_cuid");

-- AddForeignKey
ALTER TABLE "FilePreference" ADD CONSTRAINT "FilePreference_file_cuid_fkey" FOREIGN KEY ("file_cuid") REFERENCES "File"("file_cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LetterSwap" ADD CONSTRAINT "LetterSwap_file_pref_cuid_fkey" FOREIGN KEY ("file_pref_cuid") REFERENCES "FilePreference"("file_pref_cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
