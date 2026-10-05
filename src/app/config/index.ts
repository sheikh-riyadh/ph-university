import dotenv from "dotenv";
import path from "path";
import type { StringValue } from "ms";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
  front_end_url: process.env.FRONT_END_URL as string,
  smtp_password: process.env.SMTP_PASSWORD,
  smtp_email: process.env.SMTP_email,
};
