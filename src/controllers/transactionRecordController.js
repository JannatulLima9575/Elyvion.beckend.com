import prisma from "../lib/prisma.js";

// Get all transaction records
export async function getTransactionRecords(req, res, next) {
  try {
    const { customerID, taskID, statusID, typeID, limit = 50 } = req.query;

    const where = {};
    if (customerID) where.customerID = parseInt(customerID, 10);
    if (taskID) where.taskID = parseInt(taskID, 10);
    if (statusID) where.statusID = parseInt(statusID, 10);
    if (typeID) where.typeID = parseInt(typeID, 10);

    const records = await prisma.transactionRecord.findMany({
      where,
      include: {
        customer: {
          select: { id: true, loginUserName: true, name: true },
        },
        task: true,
        status: true,
      },
      orderBy: { id: "desc" },
      take: parseInt(limit, 10),
    });

    // Format to match TransactionRecords.json structure
    const formatted = records.map((record) => ({
      id: record.id,
      clientName: record.clientName,
      taskName: record.taskName,
      taskValue: record.taskValue,
      profit: record.profit,
      commission: record.commission,
      code: record.code,
      statusName: record.statusName,
      imageUrl: record.imageUrl,
      numberCode: record.numberCode,
      expiredDate: record.expiredDate,
      isExpired: record.isExpired,
      statusID: record.statusID,
      typeID: record.typeID,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get transaction record by ID
export async function getTransactionRecordById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const record = await prisma.transactionRecord.findUnique({
      where: { id },
      include: {
        customer: true,
        task: true,
        status: true,
      },
    });

    if (!record) {
      return res.status(404).json({ success: false, error: "Transaction record not found" });
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
}

