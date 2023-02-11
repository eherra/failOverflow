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
    await failureService.getAllFailures();
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

/**
 * POST /api/failures/comment/:failureId
 * @summary Created comment to Comment collections and attached it to failure given as path param
 * @param {} path - failureId
 * @param {} request.body.required - comment, commentorId
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/comment/:failureId", async (req: Request, res: Response) => {
  const failureId = req.params.failureId;
  const { comment, commentorId } = req.body;
  try {
    const createdComment = await failureService.addCommentToFailure({
      comment,
      commentorId,
      failureId,
    });

    res.status(201).json({
      comment: createdComment,
      isSuccess: true,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

/**
 * POST /api/failures/vote/:failureId
 * @summary Creates or deletes vote from failure
 * @param {} path - failureId
 * @param {} request.body.required - voterId, isAddingVote
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/vote/:failureId", async (req: Request, res: Response) => {
  // add token
  const failureId = req.params.failureId;
  const { voterId, isDeletingVote } = req.body;
  try {
    if (isDeletingVote) {
      await failureService.deleteVoteFromFailure({
        voterId,
        failureId,
      });
    } else {
      await failureService.addVoteToFailure({
        voterId,
        failureId,
      });
    }
    res.status(201).json({
      isSuccess: true,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

/**
 * POST /api/failures/rate/:failureId
 * @summary Gives a rating to a failure according to param failureId
 * @param {} path - failureId
 * @param {} request.body.required - raterId, ratingValue
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/rate/:failureId", async (req: Request, res: Response) => {
  // add token
  const failureId = req.params.failureId;
  const { raterId, ratingValue } = req.body;
  try {
    const rating = await failureService.addStarRating({
      raterId,
      ratingValue,
      failureId,
    });
    res.status(200).json({
      rating: rating,
      isSuccess: true,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

/**
 * GET /api/failures/rate/:failureId/user/:userId
 * @summary Gets ratings average and user ratings
 * @param   req.params  failureId: required, userId: Not required -> if user not logged in
 * @return {} 200 - ratingAverage, userRating -> if userId provided
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/rate/:failureId/user/:userId?", async (req: Request, res: Response) => {
  const { failureId, userId } = req.params;
  try {
    const ratingData = await failureService.getRatingData(failureId, userId);
    res.status(200).json({
      ratingData: ratingData,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

/**
 * GET /api/failures/vote/:failureId/user/:userId
 * @summary Gets amount of votes and users vote info according to the failure given by param
 * @param   req.params  failureId: required, userId: Not required -> if user not logged in
 * @return {} 200 - votesAmount, hasUserVoted -> if userId provided
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/vote/:failureId/user/:userId?", async (req: Request, res: Response) => {
  const { failureId, userId } = req.params;
  try {
    const votesData = await failureService.getVoteData(failureId, userId);
    res.status(200).json({
      hasUserVoted: votesData.hasUserVoted,
      votesAmount: votesData.votesAmount,
    });
  } catch (e) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

/**
 * PUT /api/failures/comment/:failureId/toggle-comment-allowance
 * @summary Toggles failure's commenting allowance
 * @param   req.params.required  failureId: required
 * @param   req.body.required    isCommentsAllowed
 * @return {} 200 - success
 * @return {} 400 - Bad request response
 */
failuresRouter.put(
  "/comment/:failureId/toggle-comment-allowance",
  async (req: Request, res: Response) => {
    const { failureId } = req.params;
    const { isCommentsAllowed } = req.body;
    try {
      await failureService.toggleFailureCommentingAllowance(failureId, isCommentsAllowed);
      res.status(200).json({
        isSuccess: true,
      });
    } catch (e) {
      res.status(400).json({
        isSuccess: false,
      });
    }
  },
);

export default failuresRouter;
