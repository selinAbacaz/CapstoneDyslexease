/*
  Warnings:

  - Made the column `font_size` on table `FilePreference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FilePreference" ALTER COLUMN "font_size" SET NOT NULL;
