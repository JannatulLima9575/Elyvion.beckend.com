import prisma from "../lib/prisma.js";
import { getClientIP, getIPGeolocation } from "../lib/ipGeolocation.js";

// Customer Login
export async function loginCustomer(req, res, next) {
  try {
    const { loginUserName, loginPassword } = req.body;

    // Validate input
    if (!loginUserName || !loginPassword) {
      return res.status(400).json({
        success: false,
        error: "loginUserName and loginPassword are required",
      });
    }

    // Find customer by loginUserName
    const customer = await prisma.customer.findUnique({
      where: { loginUserName },
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    if (!customer) {
      return res.status(401).json({
        success: false,
        error: "Invalid login credentials",
      });
    }

    // Check if login is disabled
    if (customer.loginIsDisabled) {
      return res.status(403).json({
        success: false,
        error: "Account login is disabled",
      });
    }

    // Verify password
    if (customer.loginPassword !== loginPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid login credentials",
      });
    }

    // Get client IP address
    const clientIP = getClientIP(req);
    
    // Get IP geolocation
    const geoData = await getIPGeolocation(clientIP);

    // Check for duplicate IP address
    let duplicateIPAddress = null;
    if (clientIP && clientIP !== 'unknown') {
      const duplicateCustomer = await prisma.customer.findFirst({
        where: {
          loginLogIPAddress: clientIP,
          id: { not: customer.id },
        },
        select: { id: true, loginUserName: true },
      });
      
      if (duplicateCustomer) {
        duplicateIPAddress = clientIP;
      }
    }

    // Update customer with login tracking information
    const updatedCustomer = await prisma.customer.update({
      where: { id: customer.id },
      data: {
        loginLogIPAddress: clientIP !== 'unknown' ? clientIP : null,
        loginLogCountry: geoData.country,
        loginLogCity: geoData.city,
        loginLogRegion: geoData.region,
        loginLogISP: geoData.isp,
        loginLogCreatedDate: new Date(),
        duplicateIPAddress: duplicateIPAddress,
      },
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    // Format response to match CustomerDetail.json structure
    const response = formatCustomerDetail(updatedCustomer);

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

// Get Customer Profile
export async function getCustomerProfile(req, res, next) {
  try {
    const { id } = req.params;
    const customerId = parseInt(id, 10);

    if (isNaN(customerId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid customer ID",
      });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        bankDetails: {
          where: { active: true },
          orderBy: { id: "desc" },
        },
        ambassadorLevelRef: true,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "Customer not found",
      });
    }

    // Format response to match CustomerProfile.json structure
    const response = formatCustomerProfile(customer);

    res.json(response);
  } catch (err) {
    next(err);
  }
}

// Get all customers (CustomerDetail.json format with filters)
export async function getCustomers(req, res, next) {
  try {
    const { 
      createdDateFrom, 
      createdDateTo,
      startDate,
      endDate,
      UserName,
      code,
      ipAddress,
      phoneNumber,
      customerStatus,
      onlineOffline,
      limit = 100 
    } = req.query;

    const where = {};
    
    // Add date range filter if provided (support both naming conventions)
    const dateFrom = startDate || createdDateFrom;
    const dateTo = endDate || createdDateTo;
    
    if (dateFrom || dateTo) {
      where.createdDate = {};
      if (dateFrom) {
        where.createdDate.gte = new Date(dateFrom);
      }
      if (dateTo) {
        // Add one day to include the entire end date
        const endDateObj = new Date(dateTo);
        endDateObj.setDate(endDateObj.getDate() + 1);
        where.createdDate.lt = endDateObj;
      }
    }

    // Add other filters
    if (UserName) {
      where.UserName = { contains: UserName, mode: 'insensitive' };
    }
    if (code) {
      where.numberCode = { contains: code, mode: 'insensitive' };
    }
    if (ipAddress) {
      where.loginLogIPAddress = { contains: ipAddress, mode: 'insensitive' };
    }
    if (phoneNumber) {
      where.phoneNumber = { contains: phoneNumber, mode: 'insensitive' };
    }
    if (customerStatus) {
      where.customerStatusID = parseInt(customerStatus, 10);
    }

    console.log("Filters applied:", where);

    const customers = await prisma.customer.findMany({
      include: {
        bankDetails: true,
      },
      orderBy: { createdDate: "desc" },
      take: parseInt(limit, 10),
    });
     
    console.log(customers)
    // Format response to match CustomerDetail.json structure
    const formatted = customers.map((customer) => formatCustomerDetail(customer));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get Customer Detail
export async function getCustomerDetail(req, res, next) {
  try {
    const { id } = req.params;
    const customerId = parseInt(id, 10);

    if (isNaN(customerId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid customer ID",
      });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "Customer not found",
      });
    }

    // Format response to match CustomerDetail.json structure
    const response = formatCustomerDetail(customer);

    res.json([response]);
  } catch (err) {
    next(err);
  }
}

// Format customer data to match CustomerProfile.json structure
function formatCustomerProfile(customer) {
  return {
    id: customer.id,
    name: customer.name,
    recommendBy: customer.recommendBy,
    phoneNumber: customer.phoneNumber,
    nrc: customer.nrc,
    referralCode: customer.referralCode,
    totalProfit: customer.totalProfit,
    assetBalance: customer.assetBalance,
    genderID: customer.genderID,
    genderName: customer.genderName,
    nationalityID: customer.nationalityID,
    nationalityName: customer.nationalityName,
    birthday: customer.birthday,
    bankDetails: customer.bankDetails.map((bank) => ({
      id: bank.id,
      bankVendorID: bank.bankVendorID,
      bankVendorName: bank.bankVendorName,
      bankAccountHolderName: bank.bankAccountHolderName,
      bankAccountNumber: bank.bankAccountNumber,
      active: bank.active,
      secondBankAccountNumber: bank.secondBankAccountNumber,
      secondOptionBankVendorID: bank.secondOptionBankVendorID,
      secondOptionBankAccountHolderName: bank.secondOptionBankAccountHolderName,
      secondOptionBankAccountNumber: bank.secondOptionBankAccountNumber,
      secondOptionSecondBankAccountNumber: bank.secondOptionSecondBankAccountNumber,
      secondOptionBankVendorName: bank.secondOptionBankVendorName,
      manualBankName: bank.manualBankName,
    })),
    memberLevelID: customer.memberLevelID,
    memberLevelName: customer.memberLevelName,
    numberCode: customer.numberCode,
    royaltyPoints: customer.royaltyPoints,
    teamSize: customer.teamSize,
    loginUserName: customer.loginUserName,
    locationName: customer.locationName,
    memberTypeID: customer.memberTypeID,
    isForceUpdateBankDetails: customer.isForceUpdateBankDetails,
    ambassadorLevel: customer.ambassadorLevel,
    ambassadorLevelName: customer.ambassadorLevelName,
    totalSalesCount: customer.totalSalesCount,
    totalWinCount: customer.totalWinCount,
    winRate: customer.winRate,
    rankingLevelID: customer.rankingLevelID,
    rankingLevelName: customer.rankingLevelName,
    createdDate: customer.createdDate,
    email: customer.email,
    totalSalesAmount: customer.totalSalesAmount,
    totalWithdrawalAmount: customer.totalWithdrawalAmount,
    totalEstimatedDailyProfitAmount: customer.totalEstimatedDailyProfitAmount,
    activePackageCount: customer.activePackageCount,
    isVerified: customer.isVerified,
    creditScore: customer.creditScore,
    isAgreedTerms: customer.isAgreedTerms,
    totalDepositAmount: customer.totalDepositAmount,
    nextAmbassadorLevelRequiredAmount: customer.nextAmbassadorLevelRequiredAmount,
    lastProfitAmount: customer.lastProfitAmount,
  };
}

// Format customer data to match CustomerDetail.json structure
function formatCustomerDetail(customer) {
  return {
    id: customer.id,
    name: customer.name,
    bankVendorID: customer.bankVendorID,
    bankVendorName: customer.bankVendorName,
    bankAccount: customer.bankAccount,
    bankHolderName: customer.bankHolderName,
    customerGroupID: customer.customerGroupID,
    customerGroupName: customer.customerGroupName,
    inquiryFromID: customer.inquiryFromID,
    inquiryFromName: customer.inquiryFromName,
    recommendBy: customer.recommendBy,
    followUpDate: customer.followUpDate,
    customerStatusID: customer.customerStatusID,
    customerStatusName: customer.customerStatusName,
    createdBy: customer.createdBy,
    createdDate: customer.createdDate,
    updatedBy: customer.updatedBy,
    updatedDate: customer.updatedDate,
    remark: customer.remark,
    phoneNumber: customer.phoneNumber,
    nrc: customer.nrc,
    birthday: customer.birthday,
    userName: customer.userName,
    totalDepositAmount: customer.totalDepositAmount,
    totalWithdrawalAmount: customer.totalWithdrawalAmount,
    totalPayoutAmount: customer.totalPayoutAmount,
    totalPNLAmount: customer.totalPNLAmount,
    loginUserName: customer.loginUserName,
    loginIsDisabled: customer.loginIsDisabled,
    referrerCustomerID: customer.referrerCustomerID,
    loginID: customer.loginID,
    recommendCustomers: customer.recommendCustomers,
    lastSalesRecords: customer.lastSalesRecords,
    lastPayoutRecords: customer.lastPayoutRecords,
    wallets: customer.wallets,
    totalRowsCount: customer.totalRowsCount,
    referralCode: customer.referralCode,
    userID: customer.userID,
    memberLevelID: customer.memberLevelID,
    memberLevelName: customer.memberLevelName,
    normalCommissionPercentage: customer.normalCommissionPercentage,
    packageCommissionPercentage: customer.packageCommissionPercentage,
    genderID: customer.genderID,
    genderName: customer.genderName,
    nationalityID: customer.nationalityID,
    nationalityName: customer.nationalityName,
    withdrawalFullName: customer.withdrawalFullName,
    withdrawalWalletAddress: customer.withdrawalWalletAddress,
    withdrawalExchangeName: customer.withdrawalExchangeName,
    withdrawalPhoneNumber: customer.withdrawalPhoneNumber,
    numberCode: customer.numberCode,
    taskProgress: customer.taskProgress,
    assetBalance: customer.assetBalance,
    memberTypeID: customer.memberTypeID,
    memberTypeName: customer.memberTypeName,
    isValidToWithdraw: customer.isValidToWithdraw,
    isStickerDriver: customer.isStickerDriver,
    locationID: customer.locationID,
    locationName: customer.locationName,
    isPayoutDaily: customer.isPayoutDaily,
    isCompanyAgent: customer.isCompanyAgent,
    companyAgentCustomerID: customer.companyAgentCustomerID,
    companyAgentClientName: customer.companyAgentClientName,
    becomeAgentDate: customer.becomeAgentDate,
    ambassadorLevel: customer.ambassadorLevel,
    ambassadorLevelName: customer.ambassadorLevelName,
    referrerCustomerLoginUserName: customer.referrerCustomerLoginUserName,
    autoSubscribePercentage: customer.autoSubscribePercentage,
    autoSubscribeDate: customer.autoSubscribeDate,
    ambassadorIsWaiveWithdrawalFees: customer.ambassadorIsWaiveWithdrawalFees,
    isFastKill: customer.isFastKill,
    rankingLevelID: customer.rankingLevelID,
    isSalesInserted: customer.isSalesInserted,
    rankingLevelName: customer.rankingLevelName,
    isTestBonusGiven: customer.isTestBonusGiven,
    isTestBonusExpired: customer.isTestBonusExpired,
    email: customer.email,
    phoneNumberVerificationID: customer.phoneNumberVerificationID,
    isPhoneNumberVerified: customer.isPhoneNumberVerified,
    isRepeatCustomer: customer.isRepeatCustomer,
    isValidDeposited: customer.isValidDeposited,
    isVerified: customer.isVerified,
    loginLogCountry: customer.loginLogCountry,
    loginLogCity: customer.loginLogCity,
    loginLogRegion: customer.loginLogRegion,
    loginLogISP: customer.loginLogISP,
    eachSetTaskNumber: customer.eachSetTaskNumber,
    totalTaskSet: customer.totalTaskSet,
    taskDetails: customer.taskDetails,
    loginLogIPAddress: customer.loginLogIPAddress,
    todayTaskProfit: customer.todayTaskProfit,
    todayLastTaskNumber: customer.todayLastTaskNumber,
    todayCompletedTaskCount: customer.todayCompletedTaskCount,
    todayCompletedTaskSetCount: customer.todayCompletedTaskSetCount,
    allTimeTaskProfit: customer.allTimeTaskProfit,
    allTimeLastTaskNumber: customer.allTimeLastTaskNumber,
    allTimeCompletedTaskCount: customer.allTimeCompletedTaskCount,
    todayLastRoundNumber: customer.todayLastRoundNumber,
    currentTotalRoundNumber: customer.currentTotalRoundNumber,
    todayRoundNumber: customer.todayRoundNumber,
    ambassadorIncentivePercentage: customer.ambassadorIncentivePercentage,
    creditScore: customer.creditScore,
    withdrawalPassword: customer.withdrawalPassword,
    currentPendingTaskProfit: customer.currentPendingTaskProfit,
    currentTaskNumber: customer.currentTaskNumber,
    manualBankName: customer.manualBankName,
    secondBankAccountNumber: customer.secondBankAccountNumber,
    actualWalletBalance: customer.actualWalletBalance,
    loginLogCreatedDate: customer.loginLogCreatedDate,
    loginPassword: customer.loginPassword,
    latestCustomerTasklistUpdatedDate: customer.latestCustomerTasklistUpdatedDate,
    isActualAccount: customer.isActualAccount,
    isAllowToTakeTask: customer.isAllowToTakeTask,
    isAllowToCompleteTask: customer.isAllowToCompleteTask,
    isAllowToWithdrawWithoutTask: customer.isAllowToWithdrawWithoutTask,
    isAllowToWithdraw: customer.isAllowToWithdraw,
    isAllowToWithdrawWhenPresetTask: customer.isAllowToWithdrawWhenPresetTask,
    isAllowToUseReferralCode: customer.isAllowToUseReferralCode,
    totalSalesCount: customer.totalSalesCount,
    isUnconditionalWithdrawalAllowed: customer.isUnconditionalWithdrawalAllowed,
    isAgreedTerms: customer.isAgreedTerms,
    specificBrand: customer.specificBrand,
    repeatCustomerLoginUserName: customer.repeatCustomerLoginUserName,
    duplicateIPAddress: customer.duplicateIPAddress,
    withdrawalSetNumberString: customer.withdrawalSetNumberString,
    totalSetDay: customer.totalSetDay,
    isKYCVerified: customer.isKYCVerified,
    secondOptionBankAccountHolderName: customer.secondOptionBankAccountHolderName,
    pendingKYCVerificationID: customer.pendingKYCVerificationID,
    currentCappingAmount: customer.currentCappingAmount,
    maxCappingAmount: customer.maxCappingAmount,
    currentPackageTransactionCount: customer.currentPackageTransactionCount,
    currentPackageMaxCount: customer.currentPackageMaxCount,
    packageName: customer.packageName,
    referralCode2: customer.referralCode2,
    packageStartDate: customer.packageStartDate,
    packageEndDate: customer.packageEndDate,
    packageDayString: customer.packageDayString,
    packageDateString: customer.packageDateString,
    duplicateBankAccountNumber: customer.duplicateBankAccountNumber,
    duplicateBankAccountHolderName: customer.duplicateBankAccountHolderName,
  };
}

// Update customer settings
export async function updateCustomerSettings(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const {
      isActualAccount,
      isAllowToTakeTask,
      isAllowToCompleteTask,
      isAllowToWithdrawWithoutTask,
      isAllowToWithdraw,
      isAllowToWithdrawWhenPresetTask,
      isAllowToUseReferralCode,
      isUnconditionalWithdrawalAllowed,
      customerStatusID,
    } = req.body;

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (isActualAccount !== undefined) updateData.isActualAccount = Boolean(isActualAccount);
    if (isAllowToTakeTask !== undefined) updateData.isAllowToTakeTask = Boolean(isAllowToTakeTask);
    if (isAllowToCompleteTask !== undefined) updateData.isAllowToCompleteTask = Boolean(isAllowToCompleteTask);
    if (isAllowToWithdrawWithoutTask !== undefined) updateData.isAllowToWithdrawWithoutTask = Boolean(isAllowToWithdrawWithoutTask);
    if (isAllowToWithdraw !== undefined) updateData.isAllowToWithdraw = Boolean(isAllowToWithdraw);
    if (isAllowToWithdrawWhenPresetTask !== undefined) updateData.isAllowToWithdrawWhenPresetTask = Boolean(isAllowToWithdrawWhenPresetTask);
    if (isAllowToUseReferralCode !== undefined) updateData.isAllowToUseReferralCode = Boolean(isAllowToUseReferralCode);
    if (isUnconditionalWithdrawalAllowed !== undefined) updateData.isUnconditionalWithdrawalAllowed = Boolean(isUnconditionalWithdrawalAllowed);
    if (customerStatusID !== undefined) updateData.customerStatusID = parseInt(customerStatusID);

    // Update customer
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    // Format response
    const response = formatCustomerDetail(updatedCustomer);

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

// Create customer
export async function createCustomer(req, res, next) {
  try {
    const {
      loginUserName,
      loginPassword,
      name,
      phoneNumber,
      referralCode,
      ambassadorLevelID,
      isActualAccount = true,
      isAllowToTakeTask = true,
      isAllowToCompleteTask = true,
      isAllowToWithdraw = true,
    } = req.body;

    if (!loginUserName || !loginPassword || !name) {
      return res.status(400).json({
        success: false,
        error: "loginUserName, loginPassword, and name are required",
      });
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { loginUserName },
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        error: "Login user name already exists",
      });
    }

    const numberCode = `C${Date.now()}`;

    const customer = await prisma.customer.create({
      data: {
        loginUserName,
        loginPassword,
        name,
        phoneNumber: phoneNumber || null,
        referralCode: referralCode || null,
        ambassadorLevelID: ambassadorLevelID ? parseInt(ambassadorLevelID, 10) : null,
        numberCode,
        isActualAccount: Boolean(isActualAccount),
        isAllowToTakeTask: Boolean(isAllowToTakeTask),
        isAllowToCompleteTask: Boolean(isAllowToCompleteTask),
        isAllowToWithdraw: Boolean(isAllowToWithdraw),
        customerStatusID: 1,
        createdDate: new Date(),
      },
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    const response = formatCustomerDetail(customer);

    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

// Update customer
export async function updateCustomer(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const {
      name,
      phoneNumber,
      referralCode,
      ambassadorLevelID,
      loginPassword,
    } = req.body;

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber || null;
    if (referralCode !== undefined) updateData.referralCode = referralCode || null;
    if (ambassadorLevelID !== undefined) updateData.ambassadorLevelID = ambassadorLevelID ? parseInt(ambassadorLevelID, 10) : null;
    if (loginPassword !== undefined && loginPassword) updateData.loginPassword = loginPassword;

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        bankDetails: true,
        user: true,
        ambassadorLevelRef: true,
      },
    });

    const response = formatCustomerDetail(updatedCustomer);

    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

// Delete customer
export async function deleteCustomer(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    await prisma.customer.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

