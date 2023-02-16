import logger from "./logger";
import { SECRET } from "./config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
  logger.error(error.message);
  console.log("ERROR handler");

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    case "JsonWebTokenError":
      return response.status(401).json({
        error: "Token not valid",
      });
    case "TokenExpiredError":
      return response.status(401).json({
        error: "token has been expired",
      });
    case "PasswordMismatch" || "Unauthorized":
      return response.status(401).json({
        error: "Unauthorized call",
      });
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

export const userExtractor = (req: any, res: Response, next: NextFunction) => {
  const decodedToken: any = jwt.verify(req.token, SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  req.user = { id: decodedToken.id };
  next();
};

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
