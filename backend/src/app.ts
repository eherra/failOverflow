import express from "express";
import cors from "cors";
import failuresRouter from "./routes/failures";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import middleware from "./utils/middleware";
import helmet from "helmet";

const app = express();
app.use(express.static("build"));
app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/failures", failuresRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
