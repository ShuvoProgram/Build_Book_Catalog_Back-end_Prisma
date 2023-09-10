/*
  Warnings:

  - You are about to drop the column `access_toke` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "access_toke",
ADD COLUMN     "access_token" TEXT,
ALTER COLUMN "refresh_token" DROP NOT NULL,
ALTER COLUMN "expires_at" DROP NOT NULL;
