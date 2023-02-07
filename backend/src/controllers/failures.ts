import express, { Request, Response } from "express";

const failuresRouter = express.Router();

failuresRouter.post("/", async (req: Request, res: Response) => {
  try {
  } catch (e) {}
});

export default failuresRouter;
