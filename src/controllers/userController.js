import prisma from "../lib/prisma.js";

export async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      take: 50,
      orderBy: { id: "desc" },
    });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid user ID" });
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// User Login
export async function loginUser(req, res, next) {
  try {
    const { userName, password } = req.body;
    console.log("userName",userName,password);
    

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        error: "userName and password are required",
      });
    }

    let user = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    const maxUserID = await prisma.user.aggregate({
  _max: { userID: true },
});
const newUserID = (maxUserID._max.userID || 0) + 1;

        // If user doesn't exist, create one automatically
    if (!user) {
      user = await prisma.user.create({
        data: {
          userName,
          password, // in production, hash the password!
          isAdmin: true,
          userID: newUserID,
        },
      });
      console.log("New user created:", user.userName);
    }

/*     if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    } */

    // Simple password check (in production, use proper hashing)
/*     if (user.password !== password) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    } */

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
      token: "dummy-token", // In production, generate JWT token
    });
  } catch (err) {
    next(err);
  }
}