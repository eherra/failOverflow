import express, { Request, Response, RequestHandler } from "express";
import { failureData } from "../mockData";
import Failure from "../models/Failure";

const failuresRouter = express.Router();

// interface FailureValues {
//   creatorId: string;
//   title: string;
//   description: string;
//   solution: string;
//   technologies?: Array<string>;
//   tags?: string;
//   allowComments: boolean;
// }

failuresRouter.post("/", (async (req: Request, res: Response) => {
  const { failure, creatorId } = req.body;

  const failureModel = new Failure({
    creator: creatorId,
    title: failure.title,
    description: failure.description,
    solution: failure.solution,
    technologies: failure?.technologies,
    tags: failure?.tags,
    allowComments: failure.allowComments,
  });

  const savedFailure = await failureModel.save();
  return res.status(201).send({ savedFailure });
}) as RequestHandler);

/**
 * GET /api/failures
 * @summary Gets all failures
 * @return {} 200 - All failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all", (async (_req: Request, res: Response) => {
  try {
    const failures = await Failure.find();
    // this needs to be mapped for a failure like on frontend
    console.log(failures);

    res.status(200).json({
      isSuccess: true,
      failures: failureData.failures,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
}) as RequestHandler);

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
