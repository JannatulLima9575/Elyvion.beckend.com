import prisma from "../lib/prisma.js";

// Get all daily check-in program details
export async function getDailyCheckInProgramDetails(req, res, next) {
  try {
    const details = await prisma.dailyCheckInProgramDetail.findMany({
      orderBy: { dayNumber: "asc" },
    });

    // Format to match DailyCheckInProgramDetails.json structure
    const formatted = details.map((detail) => ({
      id: detail.id,
      dayNumber: detail.dayNumber,
      bonusAmountGiven: detail.bonusAmountGiven,
      createdDate: detail.createdDate,
      createdBy: detail.createdBy,
      updatedDate: detail.updatedDate,
      updatedBy: detail.updatedBy,
      customerBonusAmountGiven: detail.customerBonusAmountGiven,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get daily check-in program detail by ID
export async function getDailyCheckInProgramDetailById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const detail = await prisma.dailyCheckInProgramDetail.findUnique({
      where: { id },
    });

    if (!detail) {
      return res.status(404).json({ success: false, error: "Daily check-in program detail not found" });
    }

    res.json(detail);
  } catch (err) {
    next(err);
  }
}

