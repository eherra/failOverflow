import logger from "./logger";
import { SECRET } from "./config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {
  logger.error(error.name);
  console.log("ERROR handler");

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ name: "CastError", error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ name: "ValidationError", error: error.message });
    case "JsonWebTokenError":
      return response.status(401).json({
        name: "JsonWebTokenError",
        error: "Token not valid",
      });
    case "TokenExpiredError":
      return response.status(401).json({
        name: "TokenExpiredError",
        error: "Token has been expired",
      });
    case "Error":
      if (error.message === "UnauthorizedPasswordChange") {
        return response.status(401).json({
          name: "UnauthorizedPasswordChange",
          error: "Unauthorized password change",
        });
      }
      if (error.message === "UnauthorizedLoginAttempt") {
        return response.status(401).json({
          name: "UnauthorizedLoginAttempt",
          error: "Wrong username or password",
        });
      }
  }
  next(error);
};

const tokenExtractor = (req: any, _res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

export const userAuthenticator = async (req: any, res: Response, next: NextFunction) => {
  const decodedToken: any = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id).select({ _id: 1, username: 1 });
  if (!user) {
    return res.status(401).json({ error: "Unauthorized call" });
  }

  req.user = user;
  next();
};

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userAuthenticator };
