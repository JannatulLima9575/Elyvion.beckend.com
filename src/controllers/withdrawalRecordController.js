import prisma from "../lib/prisma.js";

// Get all withdrawal records (summary list)
export async function getWithdrawalRecords(req, res, next) {
  try {
    const { limit = 50 } = req.query;

    const records = await prisma.withdrawalRecord.findMany({
      orderBy: { createdDate: "desc" },
      take: parseInt(limit, 10),
    });

    // Format to match WithdrawalRecords.json structure
    const formatted = records.map((record) => ({
      id: record.id,
      amount: record.amount,
      statusName: record.statusName,
      createdDate: record.createdDate,
      remark: record.remark,
      numberCode: record.numberCode,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get withdrawal record by ID
export async function getWithdrawalRecordById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const record = await prisma.withdrawalRecord.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ success: false, error: "Withdrawal record not found" });
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
}

