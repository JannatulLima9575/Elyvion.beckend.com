/*
  Warnings:

  - You are about to alter the column `expired_date` on the `customer_tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `active_package_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `all_time_completed_task_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `all_time_last_task_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `all_time_task_profit` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ambassador_is_waive_withdrawal_fees` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ambassador_level` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ambassador_level_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ambassador_level_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `auto_subscribe_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `auto_subscribe_percentage` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `become_agent_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `company_agent_client_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `company_agent_customer_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `credit_score` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `current_capping_amount` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `current_package_max_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `current_package_transaction_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `current_pending_task_profit` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `current_total_round_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `customer_group_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `customer_group_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `customer_status_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `customer_status_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `duplicate_bank_account_holder_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `duplicate_bank_account_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `duplicate_ip_address` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `follow_up_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `gender_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `gender_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `inquiry_from_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `inquiry_from_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_actual_account` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_agreed_terms` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_complete_task` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_take_task` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_use_referral_code` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_withdraw` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_withdraw_when_preset_task` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_allow_to_withdraw_without_task` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_fast_kill` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_force_update_bank_details` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_kyc_verified` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_payout_daily` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_phone_number_verified` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_repeat_customer` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_sales_inserted` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_sticker_driver` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_test_bonus_expired` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_test_bonus_given` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_unconditional_withdrawal_allowed` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_valid_deposited` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_valid_to_withdraw` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_payout_records` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_profit_amount` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_sales_records` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `latest_customer_tasklist_updated_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_log_city` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_log_country` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_log_created_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_log_isp` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_log_region` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `login_user_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `manual_bank_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `max_capping_amount` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `member_level_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `member_level_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `member_type_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `member_type_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `nationality_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `nationality_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `next_ambassador_level_required_amount` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `number_code` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `package_date_string` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `package_day_string` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `package_end_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `package_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `package_start_date` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `pending_kyc_verification_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number_verification_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ranking_level_id` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `ranking_level_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `referrer_customer_login_user_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `remark` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `repeat_customer_login_user_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `royalty_points` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `second_bank_account_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `second_option_bank_account_holder_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `specific_brand` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `team_size` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `today_completed_task_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `today_completed_task_set_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `today_last_round_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `today_last_task_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `today_round_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `total_estimated_daily_profit_amount` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `total_rows_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `total_sales_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `total_set_day` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `total_win_count` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `win_rate` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `withdrawal_exchange_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `withdrawal_phone_number` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `withdrawal_set_number_string` on the `customers` table. All the data in the column will be lost.
  - You are about to alter the column `expired_date` on the `transaction_records` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `approved_date` on the `withdrawals` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `is_company_agent` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `customer_tasks` DROP FOREIGN KEY `customer_tasks_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_ambassador_level_id_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_project_id_fkey`;

-- DropIndex
DROP INDEX `customer_tasks_user_id_fkey` ON `customer_tasks`;

-- DropIndex
DROP INDEX `customers_ambassador_level_id_fkey` ON `customers`;

-- DropIndex
DROP INDEX `customers_login_user_name_key` ON `customers`;

-- DropIndex
DROP INDEX `customers_user_id_fkey` ON `customers`;

-- AlterTable
ALTER TABLE `customer_tasks` MODIFY `expired_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `active_package_count`,
    DROP COLUMN `all_time_completed_task_count`,
    DROP COLUMN `all_time_last_task_number`,
    DROP COLUMN `all_time_task_profit`,
    DROP COLUMN `ambassador_is_waive_withdrawal_fees`,
    DROP COLUMN `ambassador_level`,
    DROP COLUMN `ambassador_level_id`,
    DROP COLUMN `ambassador_level_name`,
    DROP COLUMN `auto_subscribe_date`,
    DROP COLUMN `auto_subscribe_percentage`,
    DROP COLUMN `become_agent_date`,
    DROP COLUMN `company_agent_client_name`,
    DROP COLUMN `company_agent_customer_id`,
    DROP COLUMN `credit_score`,
    DROP COLUMN `current_capping_amount`,
    DROP COLUMN `current_package_max_count`,
    DROP COLUMN `current_package_transaction_count`,
    DROP COLUMN `current_pending_task_profit`,
    DROP COLUMN `current_total_round_number`,
    DROP COLUMN `customer_group_id`,
    DROP COLUMN `customer_group_name`,
    DROP COLUMN `customer_status_id`,
    DROP COLUMN `customer_status_name`,
    DROP COLUMN `duplicate_bank_account_holder_name`,
    DROP COLUMN `duplicate_bank_account_number`,
    DROP COLUMN `duplicate_ip_address`,
    DROP COLUMN `follow_up_date`,
    DROP COLUMN `gender_id`,
    DROP COLUMN `gender_name`,
    DROP COLUMN `inquiry_from_id`,
    DROP COLUMN `inquiry_from_name`,
    DROP COLUMN `is_actual_account`,
    DROP COLUMN `is_agreed_terms`,
    DROP COLUMN `is_allow_to_complete_task`,
    DROP COLUMN `is_allow_to_take_task`,
    DROP COLUMN `is_allow_to_use_referral_code`,
    DROP COLUMN `is_allow_to_withdraw`,
    DROP COLUMN `is_allow_to_withdraw_when_preset_task`,
    DROP COLUMN `is_allow_to_withdraw_without_task`,
    DROP COLUMN `is_fast_kill`,
    DROP COLUMN `is_force_update_bank_details`,
    DROP COLUMN `is_kyc_verified`,
    DROP COLUMN `is_payout_daily`,
    DROP COLUMN `is_phone_number_verified`,
    DROP COLUMN `is_repeat_customer`,
    DROP COLUMN `is_sales_inserted`,
    DROP COLUMN `is_sticker_driver`,
    DROP COLUMN `is_test_bonus_expired`,
    DROP COLUMN `is_test_bonus_given`,
    DROP COLUMN `is_unconditional_withdrawal_allowed`,
    DROP COLUMN `is_valid_deposited`,
    DROP COLUMN `is_valid_to_withdraw`,
    DROP COLUMN `is_verified`,
    DROP COLUMN `last_payout_records`,
    DROP COLUMN `last_profit_amount`,
    DROP COLUMN `last_sales_records`,
    DROP COLUMN `latest_customer_tasklist_updated_date`,
    DROP COLUMN `location_id`,
    DROP COLUMN `location_name`,
    DROP COLUMN `login_id`,
    DROP COLUMN `login_log_city`,
    DROP COLUMN `login_log_country`,
    DROP COLUMN `login_log_created_date`,
    DROP COLUMN `login_log_isp`,
    DROP COLUMN `login_log_region`,
    DROP COLUMN `login_user_name`,
    DROP COLUMN `manual_bank_name`,
    DROP COLUMN `max_capping_amount`,
    DROP COLUMN `member_level_id`,
    DROP COLUMN `member_level_name`,
    DROP COLUMN `member_type_id`,
    DROP COLUMN `member_type_name`,
    DROP COLUMN `name`,
    DROP COLUMN `nationality_id`,
    DROP COLUMN `nationality_name`,
    DROP COLUMN `next_ambassador_level_required_amount`,
    DROP COLUMN `number_code`,
    DROP COLUMN `package_date_string`,
    DROP COLUMN `package_day_string`,
    DROP COLUMN `package_end_date`,
    DROP COLUMN `package_name`,
    DROP COLUMN `package_start_date`,
    DROP COLUMN `pending_kyc_verification_id`,
    DROP COLUMN `phone_number_verification_id`,
    DROP COLUMN `ranking_level_id`,
    DROP COLUMN `ranking_level_name`,
    DROP COLUMN `referrer_customer_login_user_name`,
    DROP COLUMN `remark`,
    DROP COLUMN `repeat_customer_login_user_name`,
    DROP COLUMN `royalty_points`,
    DROP COLUMN `second_bank_account_number`,
    DROP COLUMN `second_option_bank_account_holder_name`,
    DROP COLUMN `specific_brand`,
    DROP COLUMN `team_size`,
    DROP COLUMN `today_completed_task_count`,
    DROP COLUMN `today_completed_task_set_count`,
    DROP COLUMN `today_last_round_number`,
    DROP COLUMN `today_last_task_number`,
    DROP COLUMN `today_round_number`,
    DROP COLUMN `total_estimated_daily_profit_amount`,
    DROP COLUMN `total_rows_count`,
    DROP COLUMN `total_sales_count`,
    DROP COLUMN `total_set_day`,
    DROP COLUMN `total_win_count`,
    DROP COLUMN `win_rate`,
    DROP COLUMN `withdrawal_exchange_name`,
    DROP COLUMN `withdrawal_phone_number`,
    DROP COLUMN `withdrawal_set_number_string`,
    ADD COLUMN `ambassadorLevelId` INTEGER NULL,
    ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `converted_amount_list` JSON NULL,
    ADD COLUMN `is_admin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_disabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_pop_up_join_group` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_supervisor` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `project_id` INTEGER NULL,
    ADD COLUMN `project_name` VARCHAR(191) NULL,
    ADD COLUMN `total_expenses_amount` DOUBLE NULL,
    ADD COLUMN `total_third_party_amount` DOUBLE NULL,
    MODIFY `is_company_agent` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `transaction_records` MODIFY `expired_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `withdrawals` MODIFY `approved_date` DATETIME NULL;

-- DropTable
DROP TABLE `users`;

-- CreateIndex
CREATE UNIQUE INDEX `customers_user_id_key` ON `customers`(`user_id`);

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ambassadorLevelId_fkey` FOREIGN KEY (`ambassadorLevelId`) REFERENCES `ambassador_levels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
