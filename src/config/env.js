import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  API_PREFIX: process.env.API_PREFIX || "/api",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "mysql://root@localhost:3306/giga_db",
};
