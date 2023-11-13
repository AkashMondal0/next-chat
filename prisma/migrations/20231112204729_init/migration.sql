/*
  Warnings:

  - You are about to drop the column `messageCount` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `messageCount` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `GroupSeenBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `messageCount`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `messageCount`;

-- AlterTable
ALTER TABLE `MessageDirect` ADD COLUMN `groupId` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `isGroup` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `GroupSeenBy`;

-- DropTable
DROP TABLE `Message`;

-- CreateIndex
CREATE INDEX `MessageDirect_groupId_idx` ON `MessageDirect`(`groupId`);
