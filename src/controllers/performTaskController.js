import prisma from "../lib/prisma.js";

// Get perform task page data (PerformTaskPage.json format)
export async function getPerformTaskPage(req, res, next) {
  try {
    const { customerID } = req.query;

    if (!customerID) {
      return res.status(400).json({ success: false, error: "customerID is required" });
    }

    const customerId = parseInt(customerID, 10);
    if (isNaN(customerId)) {
      return res.status(400).json({ success: false, error: "Invalid customerID" });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        customerTasks: {
          where: { statusID: 2 }, // Completed tasks
          orderBy: { taskNumber: "desc" },
          take: 1,
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    const latestTask = customer.customerTasks[0] || null;

    // Format to match PerformTaskPage.json structure
    const response = {
      memberLevelID: customer.memberLevelID,
      memberLevelName: customer.memberLevelName,
      totalProfit: customer.totalProfit,
      assetBalance: customer.assetBalance,
      customerTaskID: latestTask?.id || null,
      currentTaskNumber: latestTask?.taskNumber || customer.currentTaskNumber || null,
      totalTaskNumber: latestTask?.maxTaskNumber || customer.eachSetTaskNumber || null,
      commissionPercentage: latestTask?.commissionPercentage || null,
      tasklistDetails: null, // Can be populated from task relation if needed
      isDisabled: customer.loginIsDisabled || false,
      isMinBalanceMeet: null, // Business logic field
      todayProfitAmount: customer.todayTaskProfit || null,
      totalWithdrawalAmount: customer.totalWithdrawalAmount || null,
      totalTrialBonusAmount: null, // Not in schema
      isDailyCheckInClaimable: false, // Business logic
      isInsufficientBalance: (customer.assetBalance || 0) < 0,
      isAssessmentRequired: null, // Business logic
      expiredDate: latestTask?.expiredDate || null,
      currentCappingAmount: customer.currentCappingAmount,
      maxCappingAmount: customer.maxCappingAmount,
      lastMEVRecords: null, // Not in schema
      typeID: null, // Business logic
      completedTransactionCount: customer.currentPackageTransactionCount,
      maxTransactionCount: customer.currentPackageMaxCount,
      packageName: customer.packageName,
      isValidPackageExisted: customer.packageName !== null,
      lastProfitAmount: customer.lastProfitAmount,
      onHoldProfitAmount: null, // Business logic
      currentSet: customer.currentTotalRoundNumber,
      totalSet: customer.totalTaskSet,
      packageInvestmentAmount: null, // Business logic
      withdrawalableAmount: null, // Business logic
      pendingDailyCheckInAmount: null, // Business logic
      packageStartDate: customer.packageStartDate,
      packageEndDate: customer.packageEndDate,
      actualWalletBalance: customer.actualWalletBalance,
      outstandingAmount: (customer.assetBalance || 0) < 0 ? Math.abs(customer.assetBalance) : null,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
}

