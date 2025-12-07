/*
  Warnings:

  - You are about to drop the column `user_pref_cuid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Capitalization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FileToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_cuid` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_pref_cuid` to the `LetterSwap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_pref_cuid_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_capitalization_cuid_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_letter_swap_cuid_fkey";

-- DropForeignKey
ALTER TABLE "_FileToUser" DROP CONSTRAINT "_FileToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileToUser" DROP CONSTRAINT "_FileToUser_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "user_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LetterSwap" ADD COLUMN     "file_pref_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_pref_cuid";

-- DropTable
DROP TABLE "Capitalization";

-- DropTable
DROP TABLE "UserPreference";

-- DropTable
DROP TABLE "_FileToUser";

-- CreateTable
CREATE TABLE "FilesPreference" (
    "file_pref_cuid" TEXT NOT NULL,
    "text_color_hex" TEXT,
    "background_color_hex" TEXT,
    "text_spacing" INTEGER,
    "font_size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilesPreference_pkey" PRIMARY KEY ("file_pref_cuid")
);

-- AddForeignKey
ALTER TABLE "LetterSwap" ADD CONSTRAINT "LetterSwap_file_pref_cuid_fkey" FOREIGN KEY ("file_pref_cuid") REFERENCES "FilesPreference"("file_pref_cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "User"("user_cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
