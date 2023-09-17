/*
  Warnings:

  - You are about to drop the column `createtime` on the `messagetable` table. All the data in the column will be lost.
  - Added the required column `createdtime` to the `messagetable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messagetable" DROP COLUMN "createtime",
ADD COLUMN     "createdtime" VARCHAR(255) NOT NULL;
