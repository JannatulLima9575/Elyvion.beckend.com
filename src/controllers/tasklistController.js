import prisma from "../lib/prisma.js";

// Get all tasklists
export async function getTasklists(req, res, next) {
  try {
    const { customerID, categoryID, limit = 100 } = req.query;

    const where = {};
    if (customerID) where.customerID = parseInt(customerID, 10);
    if (categoryID) where.categoryID = parseInt(categoryID, 10);

    const tasklists = await prisma.tasklist.findMany({
      where,
      orderBy: { id: "asc" },
      take: parseInt(limit, 10),
    });

    // Format to match Tasklist.json structure
    const formatted = tasklists.map((tasklist) => ({
      id: tasklist.id,
      name: tasklist.name,
      taskValue: tasklist.taskValue,
      profit: tasklist.profit,
      commission: tasklist.commission,
      code: tasklist.code,
      currentMeetAmount: tasklist.currentMeetAmount,
      customerID: tasklist.customerID,
      imageUrl: tasklist.imageUrl,
      imagesUrl: tasklist.imagesUrl,
      milleage: tasklist.milleage,
      itemYear: tasklist.itemYear,
      itemBrand: tasklist.itemBrand,
      model: tasklist.model,
      categoryID: tasklist.categoryID,
      categoryName: tasklist.categoryName,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get tasklist by ID
export async function getTasklistById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const tasklist = await prisma.tasklist.findUnique({
      where: { id },
      include: {
        transactionRecords: true,
        customerTasks: true,
      },
    });

    if (!tasklist) {
      return res.status(404).json({ success: false, error: "Tasklist not found" });
    }

    res.json(tasklist);
  } catch (err) {
    next(err);
  }
}

// Create tasklist
export async function createTasklist(req, res, next) {
  try {
    const {
      name,
      code,
      taskValue,
      imageUrl,
      description,
    } = req.body;

    // Validate required fields
    if (!name || !code || !taskValue) {
      return res.status(400).json({
        success: false,
        error: "name, code, and taskValue are required",
      });
    }

    // Check if code already exists
    const existingTask = await prisma.tasklist.findFirst({
      where: { code },
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        error: "Task code already exists",
      });
    }

    // Create tasklist
    const tasklist = await prisma.tasklist.create({
      data: {
        name,
        code,
        taskValue: parseFloat(taskValue),
        imageUrl: imageUrl || null,
        profit: 0,
        commission: 0,
        currentMeetAmount: 0,
        customerID: null,
        categoryID: null,
        createdDate: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      data: tasklist,
    });
  } catch (err) {
    next(err);
  }
}

// Update tasklist
export async function updateTasklist(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const {
      name,
      code,
      taskValue,
      imageUrl,
      description,
    } = req.body;

    const tasklist = await prisma.tasklist.findUnique({
      where: { id },
    });

    if (!tasklist) {
      return res.status(404).json({ success: false, error: "Tasklist not found" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (taskValue !== undefined) updateData.taskValue = parseFloat(taskValue);
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl || null;

    const updatedTasklist = await prisma.tasklist.update({
      where: { id },
      data: updateData,
    });

    res.json({
      success: true,
      data: updatedTasklist,
    });
  } catch (err) {
    next(err);
  }
}

// Delete tasklist
export async function deleteTasklist(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const tasklist = await prisma.tasklist.findUnique({
      where: { id },
    });

    if (!tasklist) {
      return res.status(404).json({ success: false, error: "Tasklist not found" });
    }

    await prisma.tasklist.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Tasklist deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

