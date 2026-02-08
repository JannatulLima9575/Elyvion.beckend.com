import prisma from "../lib/prisma.js";

// Get all deposit records
export async function getDepositRecords(req, res, next) {
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

    const records = await prisma.depositRecord.findMany({
      where,
      include: {
        customer: {
          select: { id: true, loginUserName: true, name: true },
        },
        status: true,
      },
      orderBy: { createdDate: "desc" },
      take: parseInt(limit, 10),
    });

    // Format to match DepositRecords.json structure
    const formatted = records.map((record) => ({
      id: record.id,
      amount: record.amount,
      statusID: record.statusID,
      statusName: record.statusName,
      createdDate: record.createdDate,
      numberCode: record.numberCode,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get deposit record by ID
export async function getDepositRecordById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const record = await prisma.depositRecord.findUnique({
      where: { id },
      include: {
        customer: true,
        status: true,
      },
    });

    if (!record) {
      return res.status(404).json({ success: false, error: "Deposit record not found" });
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
}

