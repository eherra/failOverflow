import Failure from "../models/Failure";
import Comment from "../models/Comment";
import Vote from "../models/Vote";
import StarRating from "../models/StarRating";
import { ObjectId } from "mongodb";
import mongoose, { ClientSession } from "mongoose";

import { getUserReview, hasUserVoted, getNumberOfWeek } from "./utils/ratingUtils";
import { INewFailureValues, IVoteValues, IStarReviewValues, ICommentValues } from "../types";

const createFailure = async (failure: INewFailureValues, creatorId: string) => {
  // TODO: validate inputs
  const failureModel = new Failure({
    creator: creatorId,
    title: failure.title,
    description: failure.description,
    solution: failure.solution,
    technologies: failure?.technologies,
    allowComments: failure.allowComments,
  });

  const savedFailure = await failureModel.save();

  return savedFailure;
};

const getAllFailures = async () => {
  const allFailures = await Failure.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $project: {
        comments: 0,
        starRatings: 0,
        votes: 0,
        __v: 0,
        "creator.passwordHash": 0,
        "creator.__v": 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  return allFailures;
};

const findUsersFailures = async (userId: string) => {
  const userFailures = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
      },
    },
    {
      $project: {
        starRatings: 0,
        votes: 0,
        __v: 0,
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return userFailures;
};

const deleteFailure = async (failureId: string, userId: string) => {
  const failureToDelete = await Failure.findOne({ _id: failureId }, { creator: userId });
  // if not found, then user didnt create the failure
  if (!failureToDelete) {
    throw Error("Unauthorized");
  }
  const referencesToDelete: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
        creator: new ObjectId(userId),
      },
    },
    {
      $project: {
        comments: 1,
        starRatings: 1,
        votes: 1,
      },
    },
  ]);
  const commentIds = referencesToDelete[0].comments;
  const voteIds = referencesToDelete[0].votes;
  const ratingsIds = referencesToDelete[0].starRatings;

  const session: ClientSession = await mongoose.startSession();

  // if any of the calls fails below, transactional rollback will occurr
  try {
    session.startTransaction();
    // deleting failure
    await failureToDelete.delete();
    // deleting comments
    await Comment.deleteMany({ _id: commentIds });
    // deleting votes
    await Vote.deleteMany({ _id: voteIds });
    // deleting reviews
    await StarRating.deleteMany({ _id: ratingsIds });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const addCommentToFailure = async ({ comment, commentorId, failureId }: ICommentValues) => {
  const commentModel = new Comment({
    givenBy: commentorId,
    comment: comment,
  });
  const savedComment = await commentModel.save();
  await Failure.findByIdAndUpdate(failureId, { $push: { comments: savedComment.id } });

  return savedComment;
};

const addVoteToFailure = async ({ voterId, failureId }: IVoteValues) => {
  // TODO: check that voterId is not already existing in votes
  const voteModel = new Vote({
    givenBy: voterId,
  });

  const savedVote = await voteModel.save();
  await Failure.findByIdAndUpdate(failureId, { $push: { votes: savedVote.id } });

  return savedVote;
};

const deleteVoteFromFailure = async ({ voterId, failureId }: IVoteValues) => {
  const vote = await Vote.findOne({ givenBy: voterId });
  await Failure.findByIdAndUpdate(failureId, { $pull: { votes: vote?._id } });
  await Vote.findByIdAndDelete(vote?._id);
};

const addStarRating = async ({ ratingValue, failureId, raterId }: IStarReviewValues) => {
  const foundReview: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "starratings",
        localField: "starRatings",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $project: {
        review: {
          $filter: {
            input: "$reviews",
            as: "review",
            cond: {
              $eq: ["$$review.givenBy", new ObjectId(raterId)],
            },
          },
        },
      },
    },
  ]);
  const reviewObj = foundReview[0].review[0];

  // if user hasn't yet given any review for the failure, then object is empty
  if (!reviewObj) {
    const starRatingModel = new StarRating({
      starRating: ratingValue,
      givenBy: raterId,
    });

    const savedStarRating = await starRatingModel.save();
    await Failure.findByIdAndUpdate(failureId, { $push: { starRatings: savedStarRating.id } });
  } else {
    const reviewId = reviewObj._id.toString();
    await StarRating.findByIdAndUpdate(reviewId, {
      starRating: ratingValue,
    });
  }

  // after rating updates done, fetch updated data
  const ratingData = await getRatingData(failureId, raterId);
  return ratingData;
};

const getRatingData = async (failureId: string, userId: string) => {
  const ratingsData: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "starratings",
        localField: "starRatings",
        foreignField: "_id",
        as: "starReviews",
      },
    },
    {
      $addFields: {
        reviewAverage: {
          $avg: {
            $map: {
              input: "$starReviews",
              in: "$$this.starRating",
            },
          },
        },
      },
    },
    {
      $project: {
        starReviews: 1,
        reviewAverage: 1,
      },
    },
  ]);
  const reviewObj = ratingsData[0];
  return {
    ratingAverage: reviewObj.reviewAverage,
    userRating: userId ? getUserReview(reviewObj.starReviews, userId) : null,
  };
};

const getVoteData = async (failureId: string, userId: string) => {
  const votesData: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "votes",
        localField: "votes",
        foreignField: "_id",
        as: "votesData",
      },
    },
    {
      $project: {
        votesData: 1,
      },
    },
  ]);

  const votesAsArray = votesData[0].votesData;
  return {
    votesAmount: votesAsArray.length,
    hasUserVoted: userId ? hasUserVoted(votesAsArray, userId) : null,
  };
};

const toggleFailureCommentingAllowance = async (failureId: string, valueToToggle: boolean) => {
  await Failure.findByIdAndUpdate(failureId, { allowComments: valueToToggle });
};

const getFailureOfTheWeek = async () => {
  const currentWeeksNumber = getNumberOfWeek(new Date());
  const weekFailure = await Failure.aggregate([
    {
      $lookup: {
        from: "votes",
        localField: "votes",
        foreignField: "_id",
        as: "votesData",
      },
    },
    {
      $addFields: {
        weeksVotes: {
          $filter: {
            input: "$votesData",
            as: "vote",
            cond: {
              $eq: [
                {
                  $week: "$$vote.createdAt",
                },
                currentWeeksNumber, // current week here
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        totalVotes: {
          $size: "$weeksVotes",
        },
      },
    },
    {
      $sort: {
        totalVotes: -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $project: {
        votesData: 0,
        weeksVotes: 0,
        starRatings: 0,
        comments: 0,
        votes: 0,
        __v: 0,
        allowComments: 0,
        "creator.passwordHash": 0,
        "creator.__v": 0,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return weekFailure.length ? weekFailure[0] : null;
};

const getFailureComments = async (failureId: string) => {
  const commentsData: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $unwind: "$comments",
    },
    {
      $lookup: {
        from: "users",
        let: {
          userId: {
            $toObjectId: "$comments.givenBy",
          },
          comments: "$comments",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: ["$$comments", "$$ROOT"],
              },
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $group: {
        _id: "$_id",
        comments: {
          $push: {
            $first: "$comments",
          },
        },
      },
    },
    {
      $project: {
        "comments.passwordHash": 0,
        "comments.__v": 0,
      },
    },
    {
      $project: {
        comments: {
          $sortArray: {
            input: "$comments",
            sortBy: {
              createdAt: -1,
            },
          },
        },
      },
    },
  ]);
  return commentsData.length ? commentsData[0]?.comments : null;
};

const getFailureOfTheMonth = async () => {
  const currentMonth = new Date().getMonth() + 1;
  const failureOfTheMonth = await Failure.aggregate([
    {
      $lookup: {
        from: "starratings",
        localField: "starRatings",
        foreignField: "_id",
        as: "reviewData",
      },
    },
    {
      $addFields: {
        monthsReview: {
          $filter: {
            input: "$reviewData",
            as: "review",
            cond: {
              $eq: [
                {
                  $month: "$$review.createdAt",
                },
                currentMonth, // current month here
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        reviewAverage: {
          $avg: {
            $map: {
              input: "$monthsReview",
              in: "$$this.starRating",
            },
          },
        },
      },
    },
    {
      $sort: {
        reviewAverage: -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $project: {
        __v: 0,
        votes: 0,
        allowComments: 0,
        comments: 0,
        reviewData: 0,
        "creator.passwordHash": 0,
        "creator.__v": 0,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return failureOfTheMonth.length ? failureOfTheMonth[0] : null;
};

const getTechDistribution = async (userId: string) => {
  const techData: any = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
      },
    },
    {
      $project: {
        technologies: 1,
      },
    },
    {
      $unwind: "$technologies",
    },
    {
      $group: {
        _id: "$technologies",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        techDistribution: {
          $push: {
            k: "$_id",
            v: "$count",
          },
        },
      },
    },
    {
      $set: {
        techDistribution: {
          $map: {
            input: "$techDistribution",
            in: {
              value: "$$this.v",
              name: "$$this.k",
            },
          },
        },
      },
    },
    {
      $project: {
        techDistribution: {
          $sortArray: {
            input: "$techDistribution",
            sortBy: {
              value: -1,
            },
          },
        },
      },
    },
  ]);
  return techData;
};

const getFailureCreatedDistribution = async (userId: string) => {
  const failureDistribution = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateFromParts: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
              day: {
                $dayOfMonth: "$createdAt",
              },
            },
          },
        },
        amount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.createdAt": 1,
      },
    },
    {
      $project: {
        _id: 0,
        amount: 1,
        date: {
          $dateToString: {
            date: "$_id.createdAt",
            format: "%d-%m-%Y",
          },
        },
      },
    },
  ]);
  return failureDistribution;
};

const getVoteDistribution = async (userId: string) => {
  const voteDistribution: any = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
        "votes.0": {
          $exists: true,
        },
      },
    },
    {
      $lookup: {
        from: "votes",
        localField: "votes",
        foreignField: "_id",
        as: "votes",
      },
    },
    {
      $project: {
        "votes._id": 1,
        "votes.createdAt": 1,
      },
    },
    {
      $unwind: {
        path: "$votes",
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateFromParts: {
              year: {
                $year: "$votes.createdAt",
              },
              month: {
                $month: "$votes.createdAt",
              },
              day: {
                $dayOfMonth: "$votes.createdAt",
              },
            },
          },
        },
        amount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.createdAt": 1,
      },
    },
    {
      $project: {
        _id: 0,
        amount: 1,
        date: {
          $dateToString: {
            date: "$_id.createdAt",
            format: "%d-%m-%Y",
          },
        },
      },
    },
  ]);
  return voteDistribution;
};

export default {
  createFailure,
  getAllFailures,
  findUsersFailures,
  addCommentToFailure,
  addVoteToFailure,
  deleteVoteFromFailure,
  addStarRating,
  getRatingData,
  getVoteData,
  toggleFailureCommentingAllowance,
  getFailureOfTheWeek,
  getFailureComments,
  deleteFailure,
  getFailureOfTheMonth,
  getTechDistribution,
  getFailureCreatedDistribution,
  getVoteDistribution,
};
