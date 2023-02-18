import "express-async-errors";
import express, { Request, Response } from "express";
import failureService from "../services/failureService";
import { userAuthenticator } from "../utils/middleware";

const failuresRouter = express.Router();

/**
 * GET /api/failures
 * @summary Gets all failures
 * @return {} 200 - failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/", async (_req: Request, res: Response) => {
  const failures = await failureService.getAllFailures();
  res.status(200).json({
    failures,
  });
});

/**
 * GET /api/failures/:userId
 * @summary Gets all failures of logged in user
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/user", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const userFailures = await failureService.findUsersFailures(user.id);

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
failuresRouter.get(
  "/vote/failure-week",
  userAuthenticator,
  async (_req: Request, res: Response) => {
    const failureOfTheWeek = await failureService.getFailureOfTheWeek();

    res.status(200).json({
      failureOfTheWeek,
    });
  },
);

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
failuresRouter.get(
  "/rate/failure-month",
  userAuthenticator,
  async (_req: Request, res: Response) => {
    const failureOfTheMonth = await failureService.getFailureOfTheMonth();

    res.status(200).json({
      failureOfTheMonth,
    });
  },
);

/**
 * GET /api/failures/tech-distribution"
 * @summary Gets technologies distribution data
 * @return {} 200 - Distribution data in array where value (how often occurring in failures) and name (tech) present
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/tech-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const techDistribution = await failureService.getTechDistribution(user.id);

  res.status(200).json({
    techDistribution,
  });
});

/**
 * GET /api/failures/failures-distribution"
 * @summary Gets failures distribution data
 * @return {} 200 - Failures distribution data in array where date and amount created on that date present
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/failures-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureDistribution = await failureService.getFailureCreatedDistribution(user.id);

  res.status(200).json({
    failureDistribution,
  });
});

/**
 * GET /api/failures/vote-distribution"
 * @summary Gets vote distribution data
 * @return {} 200 - Vote distribution data in array where date and votes received on that date present
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/vote-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const voteDistribution = await failureService.getVoteDistribution(user.id);

  res.status(200).json({
    voteDistribution,
  });
});

/**
 * POST /api/failures
 * @summary Creates new failure
 * @param {Failure} request.body.required
 * @return {} 201 - Created failure
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const { failure } = req.body;
  const createdFailure = await failureService.createFailure(failure, user.id);

  res.status(201).json({ createdFailure });
});

/**
 * POST /api/failures/comment/:failureId
 * @summary Created comment to Comment collections and attached it to failure given as path param
 * @param {} req.params.required - failureId
 * @param {} request.body.required - comment
 * @return {} 200 - All user failures
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/comment/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId = req.params.failureId;
  const { comment } = req.body;
  const createdComment = await failureService.addCommentToFailure({
    comment,
    commentorId: user.id,
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
 * @param {} request.body.required - isDeletingVote
 * @return {} 200 - Succeed
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/vote/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId = req.params.failureId;
  const { isDeletingVote } = req.body;

  if (isDeletingVote) {
    await failureService.deleteVoteFromFailure({
      voterId: user.id,
      failureId,
    });
  } else {
    await failureService.addVoteToFailure({
      voterId: user.id,
      failureId,
    });
  }

  res.sendStatus(200);
});

/**
 * POST /api/failures/rate/:failureId
 * @summary Gives a rating to a failure according to param failureId
 * @param {} req.params.required - failureId
 * @param {} request.body.required - ratingValue
 * @return {} 200 - Updated rating data with fields: ratingAverage, userReview
 * @return {} 400 - Bad request response
 */
failuresRouter.post("/rate/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId = req.params.failureId;
  const { ratingValue } = req.body;

  const updatedRatingData = await failureService.addStarRating({
    raterId: user.id,
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
  userAuthenticator,
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
failuresRouter.delete("/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId = req.params.failureId;
  await failureService.deleteFailure(failureId, user.id);

  res.sendStatus(200);
});

export default failuresRouter;
