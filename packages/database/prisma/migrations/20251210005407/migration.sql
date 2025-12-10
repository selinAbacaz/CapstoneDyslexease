/*
  Warnings:

  - Added the required column `font` to the `FilePreference` table without a default value. This is not possible if the table is not empty.
  - Made the column `text_color_hex` on table `FilePreference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `background_color_hex` on table `FilePreference` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text_spacing` on table `FilePreference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FilePreference" ADD COLUMN     "font" TEXT NOT NULL,
ALTER COLUMN "text_color_hex" SET NOT NULL,
ALTER COLUMN "background_color_hex" SET NOT NULL,
ALTER COLUMN "text_spacing" SET NOT NULL;
