import prisma from "../lib/prisma.js";

// Get all projects
export async function getProjects(req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });

    // Format to match Project.json structure
    const formatted = projects.map((project) => ({
      id: project.id,
      projectName: project.projectName,
      marketID: project.marketID,
      isUpdateWallet: project.isUpdateWallet,
      active: project.active,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
}

// Get project by ID
export async function getProjectById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
}

