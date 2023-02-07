import { MONGODB_URI } from "./utils/config";
import express from "express";
import cors from "cors";
import failuresRouter from "./controllers/failures";
import userRouter from "./controllers/users";
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

app.use("/api/failures", failuresRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
