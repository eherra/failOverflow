import express from "express";
import cors from "cors";
import failuresRouter from "./routes/failures";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import middleware from "./utils/middleware";
import helmet from "helmet";
import { NODE_ENV, AWS_URL } from "./utils/config";

const app = express();
app.use(express.static("build"));
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  }),
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", AWS_URL],
    },
  }),
);

app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/failures", failuresRouter);

if (NODE_ENV === "production") {
  app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: "./build/" });
  });
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
