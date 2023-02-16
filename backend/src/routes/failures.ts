import "express-async-errors";
import express, { Request, Response } from "express";
import failureService from "../services/failureService";

const failuresRouter = express.Router();

/**
 * GET /api/failures
 * @summary Gets all failures
 * @return {} 200 - All failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all", async (_req: Request, res: Response) => {
  const failures = await failureService.getAllFailures();
  res.status(200).json({
    failures,
  });
});

/**
 * GET /api/failures/:userId
 * @summary Gets all failures of user according to path param ID
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/all/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userFailures = await failureService.findUsersFailures(userId);
  res.status(200).json({
    userFailures,
  });
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
  const ratingData = await failureService.getRatingData(failureId, userId);
  res.status(200).json({
    ratingData,
  });
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
  const votesData = await failureService.getVoteData(failureId, userId);
  res.status(200).json({
    hasUserVoted: votesData.hasUserVoted,
    votesAmount: votesData.votesAmount,
  });
});

/**
 * GET /api/failures/vote/failure-week"
 * @summary Gets failure of the week
 * @return {} 200 - failure info of the week
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/vote/failure-week", async (_req: Request, res: Response) => {
  const failureOfTheWeek = await failureService.getFailureOfTheWeek();
  res.status(200).json({
    failureOfTheWeek,
  });
});

/**
 * GET /api/failures/comment/:failureId"
 * @summary Gets failures comments
 * @param   req.params.required  failureId
 * @return {} 200 - comments of failure
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/comment/:failureId", async (req: Request, res: Response) => {
  const { failureId } = req.params;
  const commentsData = await failureService.getFailureComments(failureId);
  res.status(200).json({
    commentsData,
  });
});

/**
 * GET /api/failures/rate/failure-month"
 * @summary Gets failure of the month
 * @return {} 200 - failure info of the month
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/rate/failure-month", async (_req: Request, res: Response) => {
  const failureOfTheMonth = await failureService.getFailureOfTheMonth();
  res.status(200).json({
    failureOfTheMonth,
  });
});

/**
 * POST /api/failures
 * @summary Creates new failure to DB
 * @return {} 201 - Created failure
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/", async (req: Request, res: Response) => {
  const { failure, creatorId } = req.body;
  const createdFailure = await failureService.createFailure(failure, creatorId);
  res.status(201).json({ createdFailure });
});

/**
 * POST /api/failures/comment/:failureId
 * @summary Created comment to Comment collections and attached it to failure given as path param
 * @param {} req.params.required - failureId
 * @param {} request.body.required - comment, commentorId
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/comment/:failureId", async (req: Request, res: Response) => {
  const failureId = req.params.failureId;
  const { comment, commentorId } = req.body;
  const createdComment = await failureService.addCommentToFailure({
    comment,
    commentorId,
    failureId,
  });

  res.status(201).json({
    createdComment,
  });
});

/**
 * POST /api/failures/vote/:failureId
 * @summary Creates or deletes vote from failure
 * @param {} req.params.required - failureId
 * @param {} request.body.required - voterId, isAddingVote
 * @return {} 200 - Succeed
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/vote/:failureId", async (req: Request, res: Response) => {
  // add token
  const failureId = req.params.failureId;
  const { voterId, isDeletingVote } = req.body;
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
  res.sendStatus(200);
});

/**
 * POST /api/failures/rate/:failureId
 * @summary Gives a rating to a failure according to param failureId
 * @param {} req.params.required - failureId
 * @param {} request.body.required - raterId, ratingValue
 * @return {} 200 - Updated rating data with fields: ratingAverage, userReview
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/rate/:failureId", async (req: Request, res: Response) => {
  // add token
  const failureId = req.params.failureId;
  const { raterId, ratingValue } = req.body;
  const updatedRatingData = await failureService.addStarRating({
    raterId,
    ratingValue,
    failureId,
  });
  res.status(200).json({
    updatedRatingData,
  });
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
    await failureService.toggleFailureCommentingAllowance(failureId, isCommentsAllowed);
    res.sendStatus(200);
  },
);

/**
 * DELETE /api/failures/:failureId
 * @summary Removes failure according to failureId given as path variable
 * @param {} req.params.required - failureId
 * @return {} 200 - Success
 * @return {} 400 - Bad request response
 */
failuresRouter.delete("/:failureId", async (req: Request, res: Response) => {
  // Token
  const failureId = req.params.failureId;
  await failureService.deleteFailure(failureId);
  res.sendStatus(200);
});

export default failuresRouter;
