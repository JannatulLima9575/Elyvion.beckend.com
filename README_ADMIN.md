# Create Admin User

This guide explains how to create an admin user for the admin panel.

## Prerequisites

1. Make sure your database is set up and the Prisma schema is synced
2. Run `npm run db:push` or `npm run db:migrate` to ensure the password field is added to the User table

## Method 1: Using npm script (Recommended)

```bash
cd backend
npm run create-admin [userName] [password] [userID]
```

### Examples:

```bash
# Create admin with default values (ADMIN/admin123)
npm run create-admin

# Create admin with custom username and password
npm run create-admin myadmin mypassword123

# Create admin with custom username, password, and userID
npm run create-admin myadmin mypassword123 100
```

## Method 2: Direct Node.js execution

```bash
cd backend
node scripts/createAdmin.js [userName] [password] [userID]
```

## Method 3: Using shell scripts

### Windows:
```bash
cd backend
scripts\createAdmin.bat [userName] [password] [userID]
```

### Linux/Mac:
```bash
cd backend
chmod +x scripts/createAdmin.sh
./scripts/createAdmin.sh [userName] [password] [userID]
```

## Default Values

- **Username**: `ADMIN`
- **Password**: `admin123`
- **UserID**: Auto-generated (next available ID)

## What the script does:

1. Checks if a user with the given username already exists
2. Generates a unique userID if not provided
3. Creates a new user with:
   - `isAdmin: true`
   - `isSupervisor: true`
   - `isDisabled: false`
4. Sets the password
5. Displays the created user information

## Important Notes:

- The password field must exist in your database. If you get an error about a missing password column, run:
  ```bash
  npm run db:push
  ```
  This will sync your Prisma schema with the database.

- After creating the admin, you can log in to the admin panel at `/login` using the credentials you created.

## Troubleshooting

### Error: "Unknown column 'password'"
- Solution: Run `npm run db:push` to sync the schema with your database

### Error: "User already exists"
- Solution: Use a different username or delete the existing user first

### Error: "UserID already taken"
- Solution: Use a different userID or let the script auto-generate one

