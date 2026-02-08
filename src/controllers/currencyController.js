import prisma from "../lib/prisma.js";

// Get all currencies
export async function getCurrencies(req, res, next) {
  try {
    const currencies = await prisma.currency.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });

    // Format to match Currency.json structure
    const formatted = currencies.map((currency) => ({
      id: currency.id,
      name: currency.name,
      code: currency.code,
      active: currency.active,
      isFiat: currency.isFiat,
      isDeposit: currency.isDeposit,
      isWithdraw: currency.isWithdraw,
      rateFromUSDT: currency.rateFromUSDT,
      depositChargesPercentage: currency.depositChargesPercentage,
      withdrawalChargesPercentage: currency.withdrawalChargesPercentage,
      rateFromFiat: currency.rateFromFiat,
      networkName: currency.networkName,
      rateToUSDT: currency.rateToUSDT,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get currency by ID
export async function getCurrencyById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const currency = await prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      return res.status(404).json({ success: false, error: "Currency not found" });
    }

    res.json(currency);
  } catch (err) {
    next(err);
  }
}

