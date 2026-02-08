import prisma from "../lib/prisma.js";

// Get all sales statuses
export async function getSalesStatuses(req, res, next) {
  try {
    const statuses = await prisma.salesStatus.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });

    // Format to match SalesStatus.json structure
    const formatted = statuses.map((status) => ({
      id: status.id,
      name: status.name,
      active: status.active,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get sales status by ID
export async function getSalesStatusById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const status = await prisma.salesStatus.findUnique({
      where: { id },
    });

    if (!status) {
      return res.status(404).json({ success: false, error: "Sales status not found" });
    }

    res.json(status);
  } catch (err) {
    next(err);
  }
}

