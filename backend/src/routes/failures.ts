import express, { Request, Response } from "express";
import { failureData } from "../mockData";
import failureService from "../services/failureService";

const failuresRouter = express.Router();

/**
 * POST /api/failures
 * @summary Creates new failure to DB
 * @return {} 201 - Created failure
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/", async (req: Request, res: Response) => {
  const { failure, creatorId } = req.body;
  try {
    const createdFailure = await failureService.createFailure(failure, creatorId);
    res.status(201).send({ createdFailure });
  } catch (err) {
    console.log("Error while creating failure");
    console.log(err);
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

/**
 * GET /api/failures
 * @summary Gets all failures
 * @return {} 200 - All failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all", async (_req: Request, res: Response) => {
  try {
    const allFailures = await failureService.getAllFailures();
    console.log(allFailures);

    // still returning mockData
    res.status(200).json({
      isSuccess: true,
      failures: failureData.failures,
    });
  } catch (err) {
    console.log("Error while fetching all failures");
    console.log(err);
    res.status(400).json({
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
failuresRouter.get("/all/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    res.status(200).json({
      isSuccess: true,
      userId: userId,
      failures: failureData.userFailure,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

export default failuresRouter;
