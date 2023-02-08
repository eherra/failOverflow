import { MONGODB_URI } from "./utils/config";
import express from "express";
import cors from "cors";
import failuresRouter from "./routes/failures";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

mongoose.set("strictQuery", false);

logger.info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error: any) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/failures", failuresRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
