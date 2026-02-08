import prisma from "../lib/prisma.js";

// Get all menus
export async function getMenus(req, res, next) {
  try {
    const menus = await prisma.menu.findMany({
      where: { active: true },
      orderBy: { menuSequence: "asc" },
    });

    // Format to match menu.json structure
    const formatted = menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      active: menu.active,
      isShowPending: menu.isShowPending,
      pendingNumber: menu.pendingNumber,
      isRing: menu.isRing,
      menuSequence: menu.menuSequence,
      isWithdrawalRing: menu.isWithdrawalRing,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get menu by ID
export async function getMenuById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return res.status(404).json({ success: false, error: "Menu not found" });
    }

    res.json(menu);
  } catch (err) {
    next(err);
  }
}

