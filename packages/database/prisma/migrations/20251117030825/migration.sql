-- CreateTable
CREATE TABLE "Authentication" (
    "auth_cuid" TEXT NOT NULL,
    "provider" TEXT,
    "provider_id" TEXT,
    "user_cuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("auth_cuid")
);

-- CreateTable
CREATE TABLE "User" (
    "user_cuid" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password_hash" TEXT,
    "user_pref_cuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_cuid")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "user_pref_cuid" TEXT NOT NULL,
    "text_color_hex" TEXT,
    "background_color_hex" TEXT,
    "text_spacing" INTEGER,
    "font_size" INTEGER,
    "capitalization_cuid" TEXT,
    "letter_swap_cuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("user_pref_cuid")
);

-- CreateTable
CREATE TABLE "Capitalization" (
    "capitalization_cuid" TEXT NOT NULL,
    "is_first_letter" INTEGER,
    "is_last_letter" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capitalization_pkey" PRIMARY KEY ("capitalization_cuid")
);

-- CreateTable
CREATE TABLE "LetterSwap" (
    "letter_swap_cuid" TEXT NOT NULL,
    "letter1" CHAR(1) NOT NULL,
    "letter2" CHAR(1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LetterSwap_pkey" PRIMARY KEY ("letter_swap_cuid")
);

-- CreateTable
CREATE TABLE "File" (
    "file_cuid" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" TEXT,
    "file_link" TEXT,
    "extracted_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("file_cuid")
);

-- CreateTable
CREATE TABLE "_FileToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FileToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FileToUser_B_index" ON "_FileToUser"("B");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "User"("user_cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_pref_cuid_fkey" FOREIGN KEY ("user_pref_cuid") REFERENCES "UserPreference"("user_pref_cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_capitalization_cuid_fkey" FOREIGN KEY ("capitalization_cuid") REFERENCES "Capitalization"("capitalization_cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_letter_swap_cuid_fkey" FOREIGN KEY ("letter_swap_cuid") REFERENCES "LetterSwap"("letter_swap_cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToUser" ADD CONSTRAINT "_FileToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("file_cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToUser" ADD CONSTRAINT "_FileToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_cuid") ON DELETE CASCADE ON UPDATE CASCADE;
