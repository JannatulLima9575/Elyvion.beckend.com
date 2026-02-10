/*
  Warnings:

  - You are about to alter the column `expired_date` on the `customer_tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expired_date` on the `transaction_records` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `approved_date` on the `withdrawals` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `customer_tasks` MODIFY `expired_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `transaction_records` MODIFY `expired_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `withdrawals` MODIFY `approved_date` DATETIME NULL;

-- CreateTable
CREATE TABLE `vip_level_management` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `min_amount` DOUBLE NOT NULL,
    `task_count` INTEGER NOT NULL,
    `task_set` INTEGER NOT NULL,
    `commission_percentage` DOUBLE NOT NULL,
    `combo_commission_percentage` DOUBLE NOT NULL,
    `product_range_min_percent` DOUBLE NOT NULL,
    `product_range_max_percent` DOUBLE NOT NULL,
    `min_withdrawal_amount` DOUBLE NOT NULL,
    `max_withdrawal_amount` DOUBLE NOT NULL,
    `completed_tasks_per_day_to_withdraw` INTEGER NOT NULL,
    `withdrawal_fees_percent` DOUBLE NOT NULL,

    UNIQUE INDEX `vip_level_management_level_key`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
