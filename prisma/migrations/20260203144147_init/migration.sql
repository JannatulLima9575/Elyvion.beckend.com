-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `market_id` INTEGER NOT NULL,
    `is_update_wallet` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdrawal_reject_reasons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `is_fiat` BOOLEAN NOT NULL DEFAULT false,
    `is_deposit` BOOLEAN NOT NULL DEFAULT false,
    `is_withdraw` BOOLEAN NOT NULL DEFAULT false,
    `rate_from_usdt` DOUBLE NULL,
    `deposit_charges_percentage` DOUBLE NULL,
    `withdrawal_charges_percentage` DOUBLE NULL,
    `rate_from_fiat` DOUBLE NULL,
    `network_name` VARCHAR(191) NULL,
    `rate_to_usdt` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ambassador_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ambassador_level` INTEGER NOT NULL,
    `ambassador_level_name` VARCHAR(191) NOT NULL,
    `required_direct_referrals` INTEGER NULL,
    `required_indirect_referrals` INTEGER NULL,
    `required_member_type_id` INTEGER NULL,
    `required_member_type_referrals` INTEGER NULL,
    `cash_bonus_given` DOUBLE NULL,
    `package_bonus_given` DOUBLE NULL,
    `weekly_incentive_percentage` DOUBLE NULL,
    `incentive_percentage` DOUBLE NULL,
    `entitled_multiple_levels` JSON NULL,
    `each_set_task_number` INTEGER NULL,
    `total_task_set` INTEGER NULL,
    `combo_task_incentive_percentage` INTEGER NULL,
    `task_price_range_from` DOUBLE NULL,
    `task_price_range_to` DOUBLE NULL,
    `min_withdrawal_amount` DOUBLE NULL,
    `max_withdrawal_amount` DOUBLE NULL,
    `required_task_count_to_withdraw` INTEGER NULL,
    `withdrawal_fees` DOUBLE NULL,
    `profit_price_range_from` DOUBLE NULL,
    `profit_price_range_to` DOUBLE NULL,
    `capping_profit_amount` DOUBLE NULL,
    `min_total_sales_amount` DOUBLE NULL,
    `max_total_sales_amount` DOUBLE NULL,
    `monthly_incentive_percentage` DOUBLE NULL,
    `is_waive_withdrawal_fees` BOOLEAN NULL,
    `entitled_commission_levels` JSON NULL,
    `required_member_type_ambassador_level_name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `password` VARCHAR(191) NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `is_supervisor` BOOLEAN NOT NULL DEFAULT false,
    `project_id` INTEGER NULL,
    `project_name` VARCHAR(191) NULL,
    `brand` VARCHAR(191) NULL,
    `is_disabled` BOOLEAN NOT NULL DEFAULT false,
    `created_by` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NULL,
    `total_expenses_amount` DOUBLE NULL,
    `total_sales_amount` DOUBLE NULL,
    `total_third_party_amount` DOUBLE NULL,
    `converted_amount_list` JSON NULL,
    `total_payout_amount` DOUBLE NULL,
    `total_pnl_amount` DOUBLE NULL,
    `agent_code` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `wa_url` VARCHAR(191) NULL,
    `telegram_url` VARCHAR(191) NULL,
    `is_pop_up_join_group` BOOLEAN NOT NULL DEFAULT false,
    `telegram_url2` VARCHAR(191) NULL,
    `telegram_url3` VARCHAR(191) NULL,
    `telegram_url4` VARCHAR(191) NULL,

    UNIQUE INDEX `users_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `login_user_name` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,
    `referrer_customer_id` INTEGER NULL,
    `recommend_by` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `nrc` VARCHAR(191) NULL,
    `referral_code` VARCHAR(191) NULL,
    `referral_code2` VARCHAR(191) NULL,
    `birthday` DATE NULL,
    `email` VARCHAR(191) NULL,
    `number_code` VARCHAR(191) NULL,
    `member_level_id` INTEGER NULL,
    `member_level_name` VARCHAR(191) NULL,
    `member_type_id` INTEGER NULL,
    `member_type_name` VARCHAR(191) NULL,
    `ambassador_level_id` INTEGER NULL,
    `ambassador_level` INTEGER NULL,
    `ambassador_level_name` VARCHAR(191) NULL,
    `gender_id` INTEGER NULL,
    `gender_name` VARCHAR(191) NULL,
    `nationality_id` INTEGER NULL,
    `nationality_name` VARCHAR(191) NULL,
    `location_id` INTEGER NULL,
    `location_name` VARCHAR(191) NULL,
    `customer_status_id` INTEGER NULL,
    `customer_status_name` VARCHAR(191) NULL,
    `customer_group_id` INTEGER NULL,
    `customer_group_name` VARCHAR(191) NULL,
    `inquiry_from_id` INTEGER NULL,
    `inquiry_from_name` VARCHAR(191) NULL,
    `asset_balance` DOUBLE NULL,
    `actual_wallet_balance` DOUBLE NULL,
    `total_profit` DOUBLE NULL,
    `total_deposit_amount` DOUBLE NULL,
    `total_withdrawal_amount` DOUBLE NULL,
    `total_payout_amount` DOUBLE NULL,
    `total_pnl_amount` DOUBLE NULL,
    `total_sales_amount` DOUBLE NULL,
    `total_sales_count` INTEGER NULL,
    `total_win_count` INTEGER NULL,
    `win_rate` DOUBLE NULL,
    `ranking_level_id` INTEGER NULL,
    `ranking_level_name` VARCHAR(191) NULL,
    `royalty_points` DOUBLE NULL,
    `team_size` INTEGER NULL,
    `credit_score` INTEGER NULL,
    `is_verified` BOOLEAN NULL,
    `is_agreed_terms` BOOLEAN NULL,
    `is_force_update_bank_details` BOOLEAN NULL,
    `is_company_agent` BOOLEAN NULL DEFAULT false,
    `company_agent_customer_id` INTEGER NULL,
    `company_agent_client_name` VARCHAR(191) NULL,
    `is_fast_kill` BOOLEAN NULL,
    `is_repeat_customer` BOOLEAN NULL,
    `is_kyc_verified` BOOLEAN NULL,
    `is_actual_account` BOOLEAN NULL,
    `is_allow_to_take_task` BOOLEAN NULL,
    `is_allow_to_complete_task` BOOLEAN NULL,
    `is_allow_to_withdraw` BOOLEAN NULL,
    `is_allow_to_withdraw_without_task` BOOLEAN NULL,
    `is_allow_to_withdraw_when_preset_task` BOOLEAN NULL,
    `is_allow_to_use_referral_code` BOOLEAN NULL,
    `is_unconditional_withdrawal_allowed` BOOLEAN NULL,
    `each_set_task_number` INTEGER NULL,
    `total_task_set` INTEGER NULL,
    `total_set_day` INTEGER NULL,
    `current_total_round_number` INTEGER NULL,
    `current_task_number` INTEGER NULL,
    `today_task_profit` DOUBLE NULL,
    `today_completed_task_count` INTEGER NULL,
    `today_completed_task_set_count` INTEGER NULL,
    `all_time_task_profit` DOUBLE NULL,
    `all_time_last_task_number` INTEGER NULL,
    `all_time_completed_task_count` INTEGER NULL,
    `today_last_task_number` INTEGER NULL,
    `today_last_round_number` INTEGER NULL,
    `today_round_number` INTEGER NULL,
    `current_pending_task_profit` DOUBLE NULL,
    `withdrawal_set_number_string` VARCHAR(191) NULL,
    `normal_commission_percentage` DOUBLE NULL,
    `package_commission_percentage` DOUBLE NULL,
    `ambassador_incentive_percentage` DOUBLE NULL,
    `ambassador_is_waive_withdrawal_fees` BOOLEAN NULL,
    `next_ambassador_level_required_amount` DOUBLE NULL,
    `last_profit_amount` DOUBLE NULL,
    `total_estimated_daily_profit_amount` DOUBLE NULL,
    `active_package_count` INTEGER NULL,
    `created_by` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NULL,
    `follow_up_date` DATE NULL,
    `become_agent_date` DATE NULL,
    `auto_subscribe_percentage` DOUBLE NULL,
    `auto_subscribe_date` DATE NULL,
    `latest_customer_tasklist_updated_date` DATETIME(3) NULL,
    `login_log_ip_address` VARCHAR(191) NULL,
    `login_log_country` VARCHAR(191) NULL,
    `login_log_city` VARCHAR(191) NULL,
    `login_log_region` VARCHAR(191) NULL,
    `login_log_isp` VARCHAR(191) NULL,
    `login_log_created_date` DATETIME(3) NULL,
    `login_is_disabled` BOOLEAN NULL,
    `login_id` INTEGER NULL,
    `login_password` VARCHAR(191) NULL,
    `withdrawal_password` VARCHAR(191) NULL,
    `remark` TEXT NULL,
    `manual_bank_name` VARCHAR(191) NULL,
    `bank_account` VARCHAR(191) NULL,
    `bank_holder_name` VARCHAR(191) NULL,
    `bank_vendor_id` INTEGER NULL,
    `bank_vendor_name` VARCHAR(191) NULL,
    `second_bank_account_number` VARCHAR(191) NULL,
    `second_option_bank_account_holder_name` VARCHAR(191) NULL,
    `withdrawal_full_name` VARCHAR(191) NULL,
    `withdrawal_wallet_address` VARCHAR(191) NULL,
    `withdrawal_exchange_name` VARCHAR(191) NULL,
    `withdrawal_phone_number` VARCHAR(191) NULL,
    `duplicate_ip_address` VARCHAR(191) NULL,
    `specific_brand` VARCHAR(191) NULL,
    `repeat_customer_login_user_name` VARCHAR(191) NULL,
    `referrer_customer_login_user_name` VARCHAR(191) NULL,
    `pending_kyc_verification_id` INTEGER NULL,
    `phone_number_verification_id` INTEGER NULL,
    `is_phone_number_verified` BOOLEAN NULL,
    `current_capping_amount` DOUBLE NULL,
    `max_capping_amount` DOUBLE NULL,
    `current_package_transaction_count` INTEGER NULL,
    `current_package_max_count` INTEGER NULL,
    `package_name` VARCHAR(191) NULL,
    `package_start_date` DATE NULL,
    `package_end_date` DATE NULL,
    `package_day_string` VARCHAR(191) NULL,
    `package_date_string` VARCHAR(191) NULL,
    `duplicate_bank_account_number` VARCHAR(191) NULL,
    `duplicate_bank_account_holder_name` VARCHAR(191) NULL,
    `is_valid_to_withdraw` BOOLEAN NULL,
    `is_sticker_driver` BOOLEAN NULL,
    `is_payout_daily` BOOLEAN NULL,
    `is_sales_inserted` BOOLEAN NULL,
    `is_test_bonus_given` BOOLEAN NULL,
    `is_test_bonus_expired` BOOLEAN NULL,
    `is_valid_deposited` BOOLEAN NULL,
    `user_name` VARCHAR(191) NULL,
    `task_progress` JSON NULL,
    `task_details` JSON NULL,
    `recommend_customers` JSON NULL,
    `last_sales_records` JSON NULL,
    `last_payout_records` JSON NULL,
    `wallets` JSON NULL,
    `total_rows_count` INTEGER NULL,

    UNIQUE INDEX `customers_login_user_name_key`(`login_user_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_bank_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `bank_vendor_id` INTEGER NULL,
    `bank_vendor_name` VARCHAR(191) NULL,
    `bank_account_holder_name` VARCHAR(191) NULL,
    `bank_account_number` VARCHAR(191) NULL,
    `second_bank_account_number` VARCHAR(191) NULL,
    `second_option_bank_vendor_id` INTEGER NULL,
    `second_option_bank_account_holder_name` VARCHAR(191) NULL,
    `second_option_bank_account_number` VARCHAR(191) NULL,
    `second_option_second_bank_account_number` VARCHAR(191) NULL,
    `second_option_bank_vendor_name` VARCHAR(191) NULL,
    `manual_bank_name` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deposit_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `amount` DOUBLE NOT NULL,
    `status_id` INTEGER NOT NULL,
    `status_name` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NULL,
    `number_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdrawals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status_id` INTEGER NOT NULL,
    `status_name` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NULL,
    `number_code` VARCHAR(191) NULL,
    `login_user_name` VARCHAR(191) NULL,
    `full_name` VARCHAR(191) NULL,
    `wallet_address` VARCHAR(191) NULL,
    `exchange_name` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `bank_vendor_id` INTEGER NULL,
    `bank_vendor_name` VARCHAR(191) NULL,
    `bank_account_holder_name` VARCHAR(191) NULL,
    `bank_account_number` VARCHAR(191) NULL,
    `third_party_id` INTEGER NULL,
    `third_party_name` VARCHAR(191) NULL,
    `company_agent_client_name` VARCHAR(191) NULL,
    `customer_phone_number` VARCHAR(191) NULL,
    `approved_date` DATETIME NULL,
    `member_type_id` INTEGER NULL,
    `member_type_name` VARCHAR(191) NULL,
    `charges` DOUBLE NULL,
    `final_amount` DOUBLE NULL,
    `reject_reason_id` INTEGER NULL,
    `reject_reason_name` VARCHAR(191) NULL,
    `second_bank_account_number` VARCHAR(191) NULL,
    `manual_bank_name` VARCHAR(191) NULL,
    `remark` TEXT NULL,
    `asset_balance` DOUBLE NULL,
    `referrer_customer_login_user_name` VARCHAR(191) NULL,
    `is_hide_frontend` BOOLEAN NULL,
    `second_option_bank_account_holder_name` VARCHAR(191) NULL,
    `customer_bank_detail_id` INTEGER NULL,
    `image_url` JSON NULL,
    `is_duplicate_bank` BOOLEAN NULL,
    `fiat_currency_id` INTEGER NULL,
    `fiat_rate` DOUBLE NULL,
    `fiat_actual_amount` DOUBLE NULL,
    `fiat_currency_name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdrawal_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `status_name` VARCHAR(191) NOT NULL,
    `created_date` DATETIME(3) NULL,
    `remark` TEXT NULL,
    `number_code` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `task_value` DOUBLE NOT NULL,
    `profit` DOUBLE NULL,
    `commission` DOUBLE NULL,
    `code` VARCHAR(191) NOT NULL,
    `current_meet_amount` DOUBLE NULL,
    `customer_id` INTEGER NULL,
    `image_url` VARCHAR(191) NULL,
    `images_url` JSON NULL,
    `milleage` DOUBLE NULL,
    `item_year` INTEGER NULL,
    `item_brand` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,
    `category_id` INTEGER NULL,
    `category_name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `task_id` INTEGER NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `task_name` VARCHAR(191) NOT NULL,
    `task_value` DOUBLE NOT NULL,
    `profit` DOUBLE NOT NULL,
    `commission` DOUBLE NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `status_id` INTEGER NOT NULL,
    `status_name` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `number_code` VARCHAR(191) NULL,
    `expired_date` DATETIME NULL,
    `is_expired` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `task_id` INTEGER NULL,
    `client_name` VARCHAR(191) NULL,
    `task_name` VARCHAR(191) NULL,
    `task_value` DOUBLE NULL,
    `profit` DOUBLE NULL,
    `commission_percentage` DOUBLE NULL,
    `code` VARCHAR(191) NULL,
    `task_number` INTEGER NULL,
    `amount` DOUBLE NULL,
    `status_id` INTEGER NULL,
    `status_name` VARCHAR(191) NULL,
    `max_task_number` INTEGER NULL,
    `is_package` BOOLEAN NULL,
    `normal_commission_percentage` DOUBLE NULL,
    `package_commission_percentage` DOUBLE NULL,
    `image_url` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NULL,
    `created_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,
    `user_name` VARCHAR(191) NULL,
    `number_code` VARCHAR(191) NULL,
    `is_combo` BOOLEAN NULL,
    `round_number` INTEGER NULL,
    `combo_tasklist_id` INTEGER NULL,
    `login_user_name` VARCHAR(191) NULL,
    `is_pre_set` BOOLEAN NULL,
    `total_round_number` INTEGER NULL,
    `negative_amount_from` DOUBLE NULL,
    `negative_amount_to` DOUBLE NULL,
    `date_label` VARCHAR(191) NULL,
    `category_id` INTEGER NULL,
    `category_name` VARCHAR(191) NULL,
    `latest_task_number` INTEGER NULL,
    `booking_type_name` VARCHAR(191) NULL,
    `golden_eggs_amount` DOUBLE NULL,
    `is_golden_egg` BOOLEAN NULL,
    `golden_egg_details` JSON NULL,
    `is_golden_egg_opened` BOOLEAN NULL,
    `expired_date` DATETIME NULL,
    `is_expired` BOOLEAN NULL,
    `golden_egg_id` INTEGER NULL,
    `wallet_balance` DOUBLE NULL,
    `actual_wallet_balance` DOUBLE NULL,
    `current_task_number` INTEGER NULL,
    `all_time_last_task_number` INTEGER NULL,
    `current_pending_task_profit` DOUBLE NULL,
    `customer_current_total_round_number` INTEGER NULL,
    `customer_number_code` VARCHAR(191) NULL,
    `is_golden_egg_task` BOOLEAN NULL,
    `count` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_check_in_program_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day_number` INTEGER NOT NULL,
    `bonus_amount_given` DOUBLE NULL,
    `created_date` DATETIME(3) NULL,
    `created_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NULL,
    `customer_bonus_amount_given` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `is_show_pending` BOOLEAN NOT NULL DEFAULT false,
    `pending_number` INTEGER NULL,
    `is_ring` BOOLEAN NOT NULL DEFAULT false,
    `menu_sequence` INTEGER NOT NULL,
    `is_withdrawal_ring` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_referrer_customer_id_fkey` FOREIGN KEY (`referrer_customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ambassador_level_id_fkey` FOREIGN KEY (`ambassador_level_id`) REFERENCES `ambassador_levels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_bank_details` ADD CONSTRAINT `customer_bank_details_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deposit_records` ADD CONSTRAINT `deposit_records_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deposit_records` ADD CONSTRAINT `deposit_records_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `sales_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_customer_bank_detail_id_fkey` FOREIGN KEY (`customer_bank_detail_id`) REFERENCES `customer_bank_details`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `sales_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdrawals` ADD CONSTRAINT `withdrawals_reject_reason_id_fkey` FOREIGN KEY (`reject_reason_id`) REFERENCES `withdrawal_reject_reasons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_records` ADD CONSTRAINT `transaction_records_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_records` ADD CONSTRAINT `transaction_records_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `tasklists`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_records` ADD CONSTRAINT `transaction_records_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `sales_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_tasks` ADD CONSTRAINT `customer_tasks_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_tasks` ADD CONSTRAINT `customer_tasks_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `tasklists`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_tasks` ADD CONSTRAINT `customer_tasks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_tasks` ADD CONSTRAINT `customer_tasks_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `sales_statuses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
