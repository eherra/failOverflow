import express, { Request, Response } from "express";
import { failureData } from "../mockData";

const failuresRouter = express.Router();

failuresRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req);
    console.log(res);
  } catch (e) {}
});

/**
 * GET /api/failures
 * @summary Gets all failures
 * @return {} 200 - All failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all", async (_req: Request, res: Response) => {
  try {
    res.status(200).json({
      isSuccess: true,
      failures: failureData.failures,
    });
  } catch (e) {
    res.status(400).send().json({
      isSuccess: false,
    });
  }
});

/**
 * GET /api/failures/:userId
 * @summary Gets all failures of user according to path param ID
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    res.status(200).json({
      isSuccess: true,
      userId: userId,
      failures: failureData.userFailure,
    });
  } catch (e) {
    res.status(400).send().json({
      isSuccess: false,
    });
  }
});

export default failuresRouter;
