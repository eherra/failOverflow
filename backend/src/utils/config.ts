import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI: string | null = process.env.MONGODB_URI || null;

export { PORT, MONGODB_URI };
