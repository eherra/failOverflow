import "express-async-errors";
import express, { Request, Response } from "express";
import failureService from "../services/failures/failureService";
import commentService from "../services/failures/commentService";
import voteService from "../services/failures/voteService";
import reviewService from "../services/failures/reviewService";
import overviewService from "../services/failures/overviewService";

import { userAuthenticator } from "../utils/middleware";
import {
  IUserAllFailure,
  IFailureOfTheWeek,
  IFailureOfTheMonth,
  ICreatedFailure,
  IComment,
  IFailureDistribution,
  IVoteDistribution,
  IVotesData,
  IRatingData,
  IAllFailure,
} from "../types";

const failuresRouter = express.Router();

/**
 * GET /api/failures
 * @summary Gets all failures
 * @param   req.query.limit  limit of how many failures to fetch. If not found, default 10
 * @return {Array<IAllFailure>} 200 - Array of failures which objects has IAllFailure values present
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/", async (req: Request, res: Response) => {
  const limit: any = req.query.limit || 10;

  const failureData: { allFailures: IAllFailure[]; failuresCount: number } =
    await failureService.getAllFailures(limit);
  res.status(200).json({
    failures: failureData.allFailures,
    failuresCount: failureData.failuresCount,
  });
});

/**
 * GET /api/failures/:userId
 * @summary Gets all failures which are created by specific user
 * @return {Array<IUserAllFailure>} 200 - Array of all user failures which objects has IUserAllFailure values present
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.get("/user", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const userFailures: Array<IUserAllFailure> = await failureService.getUsersFailures(user.id);
  res.status(200).json({
    userFailures,
  });
});

/**
 * GET /api/failures/rate/:failureId/user/:userId
 * @summary Gets ratings average and user ratings
 * @param   req.params  failureId: required, userId: Not required -> if user not logged in
 * @return {IRatingData} 200 - ratingAverage, userRating -> if userId provided
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/rate/:failureId/user/:userId?", async (req: Request, res: Response) => {
  const { failureId, userId } = req.params;
  const ratingData: IRatingData = await reviewService.getReviewData(failureId, userId);

  res.status(200).json({
    ratingData,
  });
});

/**
 * GET /api/failures/vote/:failureId/user/:userId
 * @summary Gets amount of votes and users vote info according to the failure given by param
 * @param   req.params  failureId: required, userId: Not required -> if user not logged in
 * @return {IVotesData} 200 - votesAmount, hasUserVoted -> if userId provided
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/vote/:failureId/user/:userId?", async (req: Request, res: Response) => {
  const { failureId, userId } = req.params;
  const votesData: IVotesData = await voteService.getVoteData(failureId, userId);

  res.status(200).json({
    hasUserVoted: votesData.hasUserVoted,
    votesAmount: votesData.votesAmount,
  });
});

/**
 * GET /api/failures/vote/failure-week"
 * @summary Gets failure of the week
 * @return {IFailureOfTheWeek} 200 - Failure of the week data
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.get(
  "/vote/failure-week",
  userAuthenticator,
  async (_req: Request, res: Response) => {
    const failureOfTheWeek: IFailureOfTheWeek = await failureService.getFailureOfTheWeek();

    res.status(200).json({
      failureOfTheWeek,
    });
  },
);

/**
 * GET /api/failures/comment/:failureId"
 * @summary Gets failures comments
 * @param   req.params.required  failureId
 * @return {Array<IComment>} 200 - comments of failure
 * @return {} 400 - Bad request response
 */
failuresRouter.get("/comment/:failureId", async (req: Request, res: Response) => {
  const { failureId } = req.params;
  const commentsData: Array<IComment> = await commentService.getFailureComments(failureId);

  res.status(200).json({
    commentsData,
  });
});

/**
 * GET /api/failures/rate/failure-month"
 * @summary Gets failure of the month
 * @return {IFailureOfTheMonth} 200 - failure of the month data
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)

 */
failuresRouter.get(
  "/rate/failure-month",
  userAuthenticator,
  async (_req: Request, res: Response) => {
    const failureOfTheMonth: IFailureOfTheMonth = await failureService.getFailureOfTheMonth();
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
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.get("/tech-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const techDistribution = await overviewService.getTechDistribution(user.id);

  res.status(200).json({
    techDistribution,
  });
});

/**
 * GET /api/failures/failures-distribution"
 * @summary Gets failures distribution data
 * @return {Array<IFailureDistribution>} 200 - Failures distribution data in array where date and amount created on that date present
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.get("/failures-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureDistribution: Array<IFailureDistribution> =
    await overviewService.getFailureCreatedDistribution(user.id);

  res.status(200).json({
    failureDistribution,
  });
});

/**
 * GET /api/failures/vote-distribution"
 * @summary Gets vote distribution data
 * @return {Array<IVoteDistribution>} 200 - Vote distribution data in array where date and votes received on that date present
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.get("/vote-distribution", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const voteDistribution: Array<IVoteDistribution> = await overviewService.getVoteDistribution(
    user.id,
  );

  res.status(200).json({
    voteDistribution,
  });
});

/**
 * POST /api/failures
 * @summary Creates new failure
 * @param {} request.body.required
 * @return {ICreatedFailure} 201 - Created failure
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.post("/", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const { failure } = req.body;
  const createdFailure: ICreatedFailure = await failureService.createFailure(failure, user.id);

  res.status(201).json({ createdFailure });
});

/**
 * POST /api/failures/comment/:failureId
 * @summary Creates comment and attached it to failureId given as path param
 * @param {} req.params.required - failureId
 * @param {} request.body.required - comment
 * @return {IComment} 200 - Created comment
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.post("/comment/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId = req.params.failureId;
  const { comment } = req.body;

  const createdComment: IComment = await commentService.addCommentToFailure({
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
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.post("/vote/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId: string = req.params.failureId;
  const { isDeletingVote }: { isDeletingVote: boolean } = req.body;

  if (isDeletingVote) {
    await voteService.deleteVoteFromFailure({
      voterId: user.id,
      failureId,
    });
  } else {
    await voteService.addVoteToFailure({
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
 * @return {IRatingData} 200 - Updated rating data with fields: ratingAverage, userReview
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.post("/rate/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const failureId: string = req.params.failureId;
  const { ratingValue }: { ratingValue: number } = req.body;

  const updatedRatingData: IRatingData = await reviewService.addReviewToFailure({
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
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.put(
  "/comment/:failureId/toggle-comment-allowance",
  userAuthenticator,
  async (req: Request, res: Response) => {
    const { failureId } = req.params;
    const { isCommentsAllowed }: { isCommentsAllowed: boolean } = req.body;
    await commentService.toggleFailureCommentingAllowance(failureId, isCommentsAllowed);

    res.sendStatus(200);
  },
);

/**
 * DELETE /api/failures/:failureId
 * @summary Removes failure according to failureId given as path variable
 * @param {} req.params.required - failureId
 * @return {} 200 - Success
 * @return {} 400 - Bad request response
 * @return {} 401 - Unauthorized call (if JWT token not present or has expired)
 */
failuresRouter.delete("/:failureId", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const { failureId } = req.params;
  await failureService.deleteFailure(failureId, user.id);

  res.sendStatus(200);
});

export default failuresRouter;
