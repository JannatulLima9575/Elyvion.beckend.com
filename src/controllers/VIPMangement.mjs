import prisma from "../lib/prisma.js";

// Get all VIP levels
export async function getVipLevels(req, res) {
  const levels = await prisma.vipLevelManagement.findMany({
    orderBy: { level: "asc" }
  });
  res.json({ success: true, data: levels });
}

// Update VIP level
export async function updateVipLevel(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;

  // Number type fields
  const numberFields = [
    "minAmount",
    "taskCount",
    "taskSet",
    "commissionPercentage",
    "comboCommissionPercentage",
    "productRangeMinPercent",
    "productRangeMaxPercent",
    "minWithdrawalAmount",
    "maxWithdrawalAmount",
    "completedTasksPerDayToWithdraw",
    "withdrawalFeesPercent"
  ];

  // Convert string to number
  numberFields.forEach((field) => {
    if (data[field] !== undefined) {
      data[field] = Number(data[field]);
    }
  });

  const updated = await prisma.vipLevelManagement.update({
    where: {id:id},
    data,
  });

  res.json({ success: true, data: updated });
}
