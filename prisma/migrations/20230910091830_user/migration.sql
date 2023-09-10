/*
  Warnings:

  - Made the column `access_toke` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refresh_token` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "access_toke" SET NOT NULL,
ALTER COLUMN "refresh_token" SET NOT NULL,
ALTER COLUMN "expires_at" SET NOT NULL;
