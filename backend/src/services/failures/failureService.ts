import Failure from "../../models/Failure";
import Comment from "../../models/Comment";
import Vote from "../../models/Vote";
import StarRating from "../../models/StarRating";
import { ObjectId } from "mongodb";
import mongoose, { ClientSession } from "mongoose";

import { getNumberOfWeek } from "../utils/ratingUtils";
import { INewFailureValues } from "../../types";

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

const getUsersFailures = async (userId: string) => {
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

export default {
  createFailure,
  getAllFailures,
  getUsersFailures,
  getFailureOfTheWeek,
  getFailureOfTheMonth,
  deleteFailure,
};
