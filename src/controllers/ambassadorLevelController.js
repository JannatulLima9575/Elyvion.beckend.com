import prisma from "../lib/prisma.js";

// Get all ambassador levels
export async function getAmbassadorLevels(req, res, next) {
  try {
    const levels = await prisma.ambassadorLevel.findMany({
      orderBy: { ambassadorLevel: "asc" },
    });

    // Format to match AmbassadorLevels.json structure
    const formatted = levels.map((level) => ({
      id: level.id,
      ambassadorLevel: level.ambassadorLevel,
      requiredDirectReferrals: level.requiredDirectReferrals,
      requiredIndirectReferrals: level.requiredIndirectReferrals,
      requiredMemberTypeID: level.requiredMemberTypeID,
      requiredMemberTypeReferrals: level.requiredMemberTypeReferrals,
      cashBonusGiven: level.cashBonusGiven,
      packageBonusGiven: level.packageBonusGiven,
      weeklyIncentivePercentage: level.weeklyIncentivePercentage,
      ambassadorLevelName: level.ambassadorLevelName,
      customerAmbassadorLevelID: null, // Not in schema, return null
      requiredMemberTypeAmbassadorLevelName: level.requiredMemberTypeAmbassadorLevelName,
      minTotalSalesAmount: level.minTotalSalesAmount,
      maxTotalSalesAmount: level.maxTotalSalesAmount,
      monthlyIncentivePercentage: level.monthlyIncentivePercentage,
      isWaiveWithdrawalFees: level.isWaiveWithdrawalFees,
      entitledCommissionLevels: level.entitledCommissionLevels,
      incentivePercentage: level.incentivePercentage,
      entitledMultipleLevels: level.entitledMultipleLevels,
      eachSetTaskNumber: level.eachSetTaskNumber,
      totalTaskSet: level.totalTaskSet,
      comboTaskIncentivePercentage: level.comboTaskIncentivePercentage,
      taskPriceRangeFrom: level.taskPriceRangeFrom,
      taskPriceRangeTo: level.taskPriceRangeTo,
      minWithdrawalAmount: level.minWithdrawalAmount,
      maxWithdrawalAmount: level.maxWithdrawalAmount,
      requiredTaskCountToWithdraw: level.requiredTaskCountToWithdraw,
      withdrawalFees: level.withdrawalFees,
      profitPriceRangeFrom: level.profitPriceRangeFrom,
      profitPriceRangeTo: level.profitPriceRangeTo,
      cappingProfitAmount: level.cappingProfitAmount,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get ambassador level by ID
export async function getAmbassadorLevelById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const level = await prisma.ambassadorLevel.findUnique({
      where: { id },
    });

    if (!level) {
      return res.status(404).json({ success: false, error: "Ambassador level not found" });
    }

    res.json(level);
  } catch (err) {
    next(err);
  }
}

// Create ambassador level
export async function createAmbassadorLevel(req, res, next) {
  try {
    const {
      ambassadorLevelName,
      cashBonusGiven,
      eachSetTaskNumber,
      totalTaskSet,
      incentivePercentage,
      comboTaskIncentivePercentage,
      taskPriceRangeFrom,
      taskPriceRangeTo,
      minWithdrawalAmount,
      maxWithdrawalAmount,
      requiredTaskCountToWithdraw,
      withdrawalFees,
    } = req.body;

    // Validate required fields
    if (!ambassadorLevelName || !cashBonusGiven || !eachSetTaskNumber || !totalTaskSet) {
      return res.status(400).json({
        success: false,
        error: "ambassadorLevelName, cashBonusGiven, eachSetTaskNumber, and totalTaskSet are required",
      });
    }

    // Get the highest ambassadorLevel number and increment
    const highestLevel = await prisma.ambassadorLevel.findFirst({
      orderBy: { ambassadorLevel: 'desc' },
      select: { ambassadorLevel: true },
    });

    const newLevelNumber = highestLevel ? highestLevel.ambassadorLevel + 1 : 1;

    // Create ambassador level
    const level = await prisma.ambassadorLevel.create({
      data: {
        ambassadorLevel: newLevelNumber,
        ambassadorLevelName,
        cashBonusGiven: parseFloat(cashBonusGiven),
        eachSetTaskNumber: parseInt(eachSetTaskNumber, 10),
        totalTaskSet: parseInt(totalTaskSet, 10),
        incentivePercentage: incentivePercentage ? parseFloat(incentivePercentage) : 0,
        comboTaskIncentivePercentage: comboTaskIncentivePercentage ? parseFloat(comboTaskIncentivePercentage) : 0,
        taskPriceRangeFrom: taskPriceRangeFrom ? parseFloat(taskPriceRangeFrom) : 0,
        taskPriceRangeTo: taskPriceRangeTo ? parseFloat(taskPriceRangeTo) : 100,
        minWithdrawalAmount: minWithdrawalAmount ? parseFloat(minWithdrawalAmount) : 0,
        maxWithdrawalAmount: maxWithdrawalAmount ? parseFloat(maxWithdrawalAmount) : 0,
        requiredTaskCountToWithdraw: requiredTaskCountToWithdraw ? parseInt(requiredTaskCountToWithdraw, 10) : 0,
        withdrawalFees: withdrawalFees ? parseFloat(withdrawalFees) : 0,
      },
    });

    res.status(201).json({
      success: true,
      data: level,
    });
  } catch (err) {
    next(err);
  }
}

// Update ambassador level
export async function updateAmbassadorLevel(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const {
      ambassadorLevelName,
      cashBonusGiven,
      eachSetTaskNumber,
      totalTaskSet,
      incentivePercentage,
      comboTaskIncentivePercentage,
      taskPriceRangeFrom,
      taskPriceRangeTo,
      minWithdrawalAmount,
      maxWithdrawalAmount,
      requiredTaskCountToWithdraw,
      withdrawalFees,
    } = req.body;

    // Check if level exists
    const existingLevel = await prisma.ambassadorLevel.findUnique({
      where: { id },
    });

    if (!existingLevel) {
      return res.status(404).json({ success: false, error: "Ambassador level not found" });
    }

    // Build update data
    const updateData = {};
    if (ambassadorLevelName !== undefined) updateData.ambassadorLevelName = ambassadorLevelName;
    if (cashBonusGiven !== undefined) updateData.cashBonusGiven = parseFloat(cashBonusGiven);
    if (eachSetTaskNumber !== undefined) updateData.eachSetTaskNumber = parseInt(eachSetTaskNumber, 10);
    if (totalTaskSet !== undefined) updateData.totalTaskSet = parseInt(totalTaskSet, 10);
    if (incentivePercentage !== undefined) updateData.incentivePercentage = parseFloat(incentivePercentage);
    if (comboTaskIncentivePercentage !== undefined) updateData.comboTaskIncentivePercentage = parseFloat(comboTaskIncentivePercentage);
    if (taskPriceRangeFrom !== undefined) updateData.taskPriceRangeFrom = parseFloat(taskPriceRangeFrom);
    if (taskPriceRangeTo !== undefined) updateData.taskPriceRangeTo = parseFloat(taskPriceRangeTo);
    if (minWithdrawalAmount !== undefined) updateData.minWithdrawalAmount = parseFloat(minWithdrawalAmount);
    if (maxWithdrawalAmount !== undefined) updateData.maxWithdrawalAmount = parseFloat(maxWithdrawalAmount);
    if (requiredTaskCountToWithdraw !== undefined) updateData.requiredTaskCountToWithdraw = parseInt(requiredTaskCountToWithdraw, 10);
    if (withdrawalFees !== undefined) updateData.withdrawalFees = parseFloat(withdrawalFees);

    // Update level
    const updatedLevel = await prisma.ambassadorLevel.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: updatedLevel,
    });
  } catch (err) {
    next(err);
  }
}

// Delete ambassador level
export async function deleteAmbassadorLevel(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const level = await prisma.ambassadorLevel.findUnique({
      where: { id },
    });

    if (!level) {
      return res.status(404).json({ success: false, error: "Ambassador level not found" });
    }

    await prisma.ambassadorLevel.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Ambassador level deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

