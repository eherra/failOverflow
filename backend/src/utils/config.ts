import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI_DOCKER: string | null = process.env.MONGODB_URI_DOCKER || null;
const MONGODB_URI_ATLAS: string | null = process.env.MONGODB_URI_ATLAS || null;

const SECRET: string = process.env.SECRET || "";
const TOKEN_EXPIRING_TIME: string = process.env.TOKEN_EXPIRING_TIME || "1h";
const NODE_ENV: string = process.env.NODE_ENV || "development";

export { PORT, MONGODB_URI_DOCKER, MONGODB_URI_ATLAS, SECRET, TOKEN_EXPIRING_TIME, NODE_ENV };
