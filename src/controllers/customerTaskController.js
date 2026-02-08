import prisma from "../lib/prisma.js";

// Get all customer tasks (ByCustomerTask.json format)
export async function getCustomerTasks(req, res, next) {
  try {
    const { customerID, taskID, statusID, userID, limit = 100 } = req.query;

    const where = {};
    if (customerID) where.customerID = parseInt(customerID, 10);
    if (taskID) where.taskID = parseInt(taskID, 10);
    if (statusID) where.statusID = parseInt(statusID, 10);
    if (userID) where.userID = parseInt(userID, 10);

    const tasks = await prisma.customerTask.findMany({
      where,
      include: {
        customer: {
          select: { id: true, loginUserName: true, name: true },
        },
        task: true,
        user: true,
        status: true,
      },
      orderBy: { createdDate: "desc" },
      take: parseInt(limit, 10),
    });

    // Format to match ByCustomerTask.json structure
    const formatted = tasks.map((task) => ({
      id: task.id,
      customerID: task.customerID,
      clientName: task.clientName,
      taskID: task.taskID,
      taskName: task.taskName,
      taskValue: task.taskValue,
      profit: task.profit,
      commissionPercentage: task.commissionPercentage,
      code: task.code,
      taskNumber: task.taskNumber,
      amount: task.amount,
      statusID: task.statusID,
      statusName: task.statusName,
      maxTaskNumber: task.maxTaskNumber,
      isPackage: task.isPackage,
      normalCommissionPercentage: task.normalCommissionPercentage,
      packageCommissionPercentage: task.packageCommissionPercentage,
      imageUrl: task.imageUrl,
      createdDate: task.createdDate,
      createdBy: task.createdBy,
      updatedDate: task.updatedDate,
      updatedBy: task.updatedBy,
      userID: task.userID,
      userName: task.userName,
      numberCode: task.numberCode,
      isCombo: task.isCombo,
      roundNumber: task.roundNumber,
      comboTasklistID: task.comboTasklistID,
      loginUserName: task.loginUserName,
      isPreSet: task.isPreSet,
      totalRoundNumber: task.totalRoundNumber,
      negativeAmountFrom: task.negativeAmountFrom,
      negativeAmountTo: task.negativeAmountTo,
      dateLabel: task.dateLabel,
      categoryID: task.categoryID,
      categoryName: task.categoryName,
      latestTaskNumber: task.latestTaskNumber,
      bookingTypeName: task.bookingTypeName,
      goldenEggsAmount: task.goldenEggsAmount,
      isGoldenEgg: task.isGoldenEgg,
      goldenEggDetails: task.goldenEggDetails,
      isGoldenEggOpened: task.isGoldenEggOpened,
      expiredDate: task.expiredDate,
      isExpired: task.isExpired,
      goldenEggID: task.goldenEggID,
      walletBalance: task.walletBalance,
      actualWalletBalance: task.actualWalletBalance,
      currentTaskNumber: task.currentTaskNumber,
      allTimeLastTaskNumber: task.allTimeLastTaskNumber,
      currentPendingTaskProfit: task.currentPendingTaskProfit,
      customerCurrentTotalRoundNumber: task.customerCurrentTotalRoundNumber,
      customerNumberCode: task.customerNumberCode,
      isGoldenEggTask: task.isGoldenEggTask,
      count: task.count,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get customer task by ID
export async function getCustomerTaskById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const task = await prisma.customerTask.findUnique({
      where: { id },
      include: {
        customer: true,
        task: true,
        user: true,
        status: true,
      },
    });

    if (!task) {
      return res.status(404).json({ success: false, error: "Customer task not found" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
}

// Get preset customer tasklist (PresetCustomerTasklist.json format)
export async function getPresetCustomerTasklist(req, res, next) {
  try {
    const { customerID } = req.query;

    const where = { isPreSet: true };
    if (customerID) where.customerID = parseInt(customerID, 10);

    const tasks = await prisma.customerTask.findMany({
      where,
      include: {
        customer: true,
        task: true,
        user: true,
        status: true,
      },
      orderBy: { createdDate: "desc" },
    });

    // Format similar to ByCustomerTask.json
    const formatted = tasks.map((task) => ({
      id: task.id,
      customerID: task.customerID,
      clientName: task.clientName,
      taskID: task.taskID,
      taskName: task.taskName,
      taskValue: task.taskValue,
      profit: task.profit,
      commissionPercentage: task.commissionPercentage,
      code: task.code,
      taskNumber: task.taskNumber,
      amount: task.amount,
      statusID: task.statusID,
      statusName: task.statusName,
      maxTaskNumber: task.maxTaskNumber,
      isPackage: task.isPackage,
      normalCommissionPercentage: task.normalCommissionPercentage,
      packageCommissionPercentage: task.packageCommissionPercentage,
      imageUrl: task.imageUrl,
      createdDate: task.createdDate,
      createdBy: task.createdBy,
      updatedDate: task.updatedDate,
      updatedBy: task.updatedBy,
      userID: task.userID,
      userName: task.userName,
      numberCode: task.numberCode,
      isCombo: task.isCombo,
      roundNumber: task.roundNumber,
      comboTasklistID: task.comboTasklistID,
      loginUserName: task.loginUserName,
      isPreSet: task.isPreSet,
      totalRoundNumber: task.totalRoundNumber,
      negativeAmountFrom: task.negativeAmountFrom,
      negativeAmountTo: task.negativeAmountTo,
      dateLabel: task.dateLabel,
      categoryID: task.categoryID,
      categoryName: task.categoryName,
      latestTaskNumber: task.latestTaskNumber,
      bookingTypeName: task.bookingTypeName,
      goldenEggsAmount: task.goldenEggsAmount,
      isGoldenEgg: task.isGoldenEgg,
      goldenEggDetails: task.goldenEggDetails,
      isGoldenEggOpened: task.isGoldenEggOpened,
      expiredDate: task.expiredDate,
      isExpired: task.isExpired,
      goldenEggID: task.goldenEggID,
      walletBalance: task.walletBalance,
      actualWalletBalance: task.actualWalletBalance,
      currentTaskNumber: task.currentTaskNumber,
      allTimeLastTaskNumber: task.allTimeLastTaskNumber,
      currentPendingTaskProfit: task.currentPendingTaskProfit,
      customerCurrentTotalRoundNumber: task.customerCurrentTotalRoundNumber,
      customerNumberCode: task.customerNumberCode,
      isGoldenEggTask: task.isGoldenEggTask,
      count: task.count,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

