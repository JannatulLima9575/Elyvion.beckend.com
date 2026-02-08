import prisma from "../lib/prisma.js";

// Get all withdrawals
export async function getWithdrawals(req, res, next) {
  try {
    const { 
      customerID, 
      customerId,
      statusID, 
      createdDateFrom, 
      createdDateTo,
      startDate,
      endDate,
      limit = 50 
    } = req.query;

    const where = {};
    if (customerID) where.customerID = parseInt(customerID, 10);
    if (customerId) where.customerID = parseInt(customerId, 10);
    if (statusID) where.statusID = parseInt(statusID, 10);
    
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

    const withdrawals = await prisma.withdrawal.findMany({
      where,
      include: {
        customer: {
          select: { id: true, loginUserName: true, name: true },
        },
        status: true,
        rejectReason: true,
        customerBankDetail: true,
      },
      orderBy: { createdDate: "desc" },
      take: parseInt(limit, 10),
    });

    // Format to match Withdrawal.json structure
    const formatted = withdrawals.map((withdrawal) => ({
      id: withdrawal.id,
      customerID: withdrawal.customerID,
      clientName: withdrawal.clientName,
      amount: withdrawal.amount,
      statusID: withdrawal.statusID,
      statusName: withdrawal.statusName,
      createdBy: withdrawal.createdBy,
      createdDate: withdrawal.createdDate,
      updatedBy: withdrawal.updatedBy,
      updatedDate: withdrawal.updatedDate,
      numberCode: withdrawal.numberCode,
      loginUserName: withdrawal.loginUserName,
      fullName: withdrawal.fullName,
      walletAddress: withdrawal.walletAddress,
      exchangeName: withdrawal.exchangeName,
      phoneNumber: withdrawal.phoneNumber,
      bankVendorID: withdrawal.bankVendorID,
      bankVendorName: withdrawal.bankVendorName,
      bankAccountHolderName: withdrawal.bankAccountHolderName,
      bankAccountNumber: withdrawal.bankAccountNumber,
      thirdPartyID: withdrawal.thirdPartyID,
      thirdPartyName: withdrawal.thirdPartyName,
      companyAgentClientName: withdrawal.companyAgentClientName,
      customerPhoneNumber: withdrawal.customerPhoneNumber,
      approvedDate: withdrawal.approvedDate,
      memberTypeID: withdrawal.memberTypeID,
      memberTypeName: withdrawal.memberTypeName,
      charges: withdrawal.charges,
      finalAmount: withdrawal.finalAmount,
      rejectReasonID: withdrawal.rejectReasonID,
      rejectReasonName: withdrawal.rejectReasonName,
      secondBankAccountNumber: withdrawal.secondBankAccountNumber,
      manualBankName: withdrawal.manualBankName,
      remark: withdrawal.remark,
      assetBalance: withdrawal.assetBalance,
      referrerCustomerLoginUserName: withdrawal.referrerCustomerLoginUserName,
      isHideFrontend: withdrawal.isHideFrontend,
      secondOptionBankAccountHolderName: withdrawal.secondOptionBankAccountHolderName,
      customerBankDetailID: withdrawal.customerBankDetailID,
      imageUrl: withdrawal.imageUrl,
      isDuplicateBank: withdrawal.isDuplicateBank,
      fiatCurrencyID: withdrawal.fiatCurrencyID,
      fiatRate: withdrawal.fiatRate,
      fiatActualAmount: withdrawal.fiatActualAmount,
      fiatCurrencyName: withdrawal.fiatCurrencyName,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get withdrawal by ID
export async function getWithdrawalById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id },
      include: {
        customer: true,
        status: true,
        rejectReason: true,
        customerBankDetail: true,
      },
    });

    if (!withdrawal) {
      return res.status(404).json({ success: false, error: "Withdrawal not found" });
    }

    res.json(withdrawal);
  } catch (err) {
    next(err);
  }
}

// Update withdrawal status
export async function updateWithdrawalStatus(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const { statusID, rejectReasonID, remark } = req.body;

    if (!statusID) {
      return res.status(400).json({ success: false, error: "statusID is required" });
    }

    // Validate statusID (1: Pending, 2: Approved, 3: Rejected)
    if (![1, 2, 3].includes(parseInt(statusID))) {
      return res.status(400).json({ success: false, error: "Invalid statusID. Must be 1, 2, or 3" });
    }

    const updateData = {
      statusID: parseInt(statusID),
      updatedDate: new Date(),
      updatedBy: req.body.updatedBy || "Admin", // In production, get from auth token
    };

    if (statusID === 2) {
      // Approved
      updateData.approvedDate = new Date();
    } else if (statusID === 3) {
      // Rejected
      if (rejectReasonID) {
        updateData.rejectReasonID = parseInt(rejectReasonID);
      }
      if (remark) {
        updateData.remark = remark;
      }
    }

    const withdrawal = await prisma.withdrawal.update({
      where: { id },
      data: updateData,
      include: {
        customer: true,
        status: true,
        rejectReason: true,
        customerBankDetail: true,
      },
    });

    res.json({
      success: true,
      data: withdrawal,
    });
  } catch (err) {
    next(err);
  }
}

