/*
  Warnings:

  - You are about to drop the column `groupId` on the `MessageDirect` table. All the data in the column will be lost.
  - You are about to drop the column `isGroup` on the `MessageDirect` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `MessageDirect_groupId_idx` ON `MessageDirect`;

-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `messageCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Group` ADD COLUMN `messageCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `MessageDirect` DROP COLUMN `groupId`,
    DROP COLUMN `isGroup`;

-- CreateTable
CREATE TABLE `GroupSeenBy` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `messageDirectId` VARCHAR(191) NULL,

    INDEX `GroupSeenBy_messageId_idx`(`messageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `fileUrl` TEXT NULL,
    `memberId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Message_groupId_idx`(`groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
