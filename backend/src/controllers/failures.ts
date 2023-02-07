import express, { Request, Response } from "express";

const failuresRouter = express.Router();

failuresRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req);
    console.log(res);
  } catch (e) {}
});

export default failuresRouter;
