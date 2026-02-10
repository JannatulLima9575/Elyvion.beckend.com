import createJWT from "../../auth/createJWT.mjs";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

// Create new user
export async function createUser(req, res, next) {
  try {
    const { userName, phoneNumber, password, gender, referral } = req.body;
    console.log("nfdnfdsnfk");
    
    if (!userName || !phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        error: "Username, phone, and password are required",
      });
    }

    // Check if username already exists
    const existingUser = await prisma.customer.findFirst({ where: { userName } });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate new userID
    const maxUserID = await prisma.customer.aggregate({ _max: { userID: true } });
    const newUserID = (maxUserID._max.userID || 0) + 1;

    // Create user
    const newUser = await prisma.customer.create({
      data: {
        userName,
        phoneNumber,
        password: hashedPassword,
        userID: newUserID,
        referralCode: referral || null,
      },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
}


export async function getUsers(req, res, next) {
  try {
    const users = await prisma.customer.findMany({
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
    const user = await prisma.customer.findUnique({
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
    const { name, password } = req.body;
    console.log("userName",name,password);
    

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        error: "userName and password are required",
      });
    }

    let user = await prisma.customer.findFirst({
      where: {
        userName: name,
      },
    });


    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    } 

    // Simple password check (in production, use proper hashing)
    const passwordMatch = await bcrypt.compare(password, user.password);
     if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    } 

    const result = await createJWT(res,user);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}