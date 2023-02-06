import logger from "./logger";
import { Request, Response, NextFunction } from "express";

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    case "JsonWebTokenError":
      return response.status(401).json({
        error: "invalid token",
      });
    case "TokenExpiredError":
      return response.status(401).json({
        error: "token expired",
      });
  }

  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
