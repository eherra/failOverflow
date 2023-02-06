import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI: string | null = process.env.MONGODB_URI || null;
const SECRET: string = process.env.SECRET || "";
const TOKEN_EXPIRING_TIME: number = parseInt(
  process.env.TOKEN_EXPIRING_TIME || "",
  1800
);

export { PORT, MONGODB_URI, SECRET, TOKEN_EXPIRING_TIME };
