/*
  Warnings:

  - Made the column `extracted_text` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_user_cuid_fkey";

-- DropForeignKey
ALTER TABLE "FilePreference" DROP CONSTRAINT "FilePreference_file_cuid_fkey";

-- DropForeignKey
ALTER TABLE "LetterSwap" DROP CONSTRAINT "LetterSwap_file_pref_cuid_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "extracted_text" SET NOT NULL,
ALTER COLUMN "extracted_text" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "FilePreference" ADD CONSTRAINT "FilePreference_file_cuid_fkey" FOREIGN KEY ("file_cuid") REFERENCES "File"("file_cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LetterSwap" ADD CONSTRAINT "LetterSwap_file_pref_cuid_fkey" FOREIGN KEY ("file_pref_cuid") REFERENCES "FilePreference"("file_pref_cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "User"("user_cuid") ON DELETE CASCADE ON UPDATE CASCADE;
