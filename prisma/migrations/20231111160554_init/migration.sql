-- DropForeignKey
ALTER TABLE `Group` DROP FOREIGN KEY `Group_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupSeenBy` DROP FOREIGN KEY `GroupSeenBy_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageDirect` DROP FOREIGN KEY `MessageDirect_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SeenBy` DROP FOREIGN KEY `SeenBy_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `_ConversationToUser` DROP FOREIGN KEY `_ConversationToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ConversationToUser` DROP FOREIGN KEY `_ConversationToUser_B_fkey`;

-- CreateTable
CREATE TABLE `_GroupToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GroupToUser_AB_unique`(`A`, `B`),
    INDEX `_GroupToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `Group` RENAME INDEX `Group_authorId_fkey` TO `Group_authorId_idx`;

-- RenameIndex
ALTER TABLE `GroupSeenBy` RENAME INDEX `GroupSeenBy_messageId_fkey` TO `GroupSeenBy_messageId_idx`;

-- RenameIndex
ALTER TABLE `Member` RENAME INDEX `Member_groupId_fkey` TO `Member_groupId_idx`;

-- RenameIndex
ALTER TABLE `Message` RENAME INDEX `Message_groupId_fkey` TO `Message_groupId_idx`;

-- RenameIndex
ALTER TABLE `MessageDirect` RENAME INDEX `MessageDirect_conversationId_fkey` TO `MessageDirect_conversationId_idx`;

-- RenameIndex
ALTER TABLE `Notification` RENAME INDEX `Notification_userId_fkey` TO `Notification_userId_idx`;

-- RenameIndex
ALTER TABLE `SeenBy` RENAME INDEX `SeenBy_messageId_fkey` TO `SeenBy_messageId_idx`;
