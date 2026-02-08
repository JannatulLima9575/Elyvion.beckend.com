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
