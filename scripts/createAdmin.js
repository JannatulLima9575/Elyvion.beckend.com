import 'dotenv/config';
import prisma from '../src/lib/prisma.js';


async function createAdmin() {
  try {
    // Get arguments from command line
    const args = process.argv.slice(2);
    const userName = args[0] || 'admin';
    const password = args[1] || 'admin123';
    const userID = args[2] ? parseInt(args[2], 10) : null;

    console.log('Creating admin user...');
    console.log(`Username: ${userName}`);
    console.log(`Password: ${password}`);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    if (existingUser) {
      console.log(`❌ User with username "${userName}" already exists!`);
      console.log('   If you want to update the password, please use the update script or delete the user first.');
      process.exit(1);
    }

    let newUserID;
    if (userID) {
      const existingUserID = await prisma.user.findUnique({
        where: { userID },
      });
      if (existingUserID) {
        console.log(`❌ UserID ${userID} is already taken!`);
        process.exit(1);
      }
      newUserID = userID;
    } else {
      const highestUser = await prisma.user.findFirst({
        orderBy: { userID: 'desc' },
        select: { userID: true },
      });
      newUserID = highestUser ? highestUser.userID + 1 : 1;
    }

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        userName: userName,
        userID: newUserID,
        password: password,
        isAdmin: true,
        isSupervisor: true,
        isDisabled: false,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log(`   ID: ${adminUser.id}`);
    console.log(`   UserID: ${adminUser.userID}`);
    console.log(`   Username: ${adminUser.userName}`);
    console.log(`   Password: ${password}`);
    console.log(`   Is Admin: ${adminUser.isAdmin}`);
    console.log(`   Is Supervisor: ${adminUser.isSupervisor}`);
    console.log('');
    console.log('📝 Login credentials:');
    console.log(`   Username: ${userName}`);
    console.log(`   Password: ${password}`);

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

createAdmin();

