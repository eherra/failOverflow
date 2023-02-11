import Failure from "../models/Failure";
import Comment from "../models/Comment";
import Vote from "../models/Vote";
import User from "../models/User";
import StarRating from "../models/StarRating";
import { ObjectId } from "mongodb";
import { getReviewAverage, getUserReview, hasUserVoted } from "./utils/ratingUtils";

interface FailureValues {
  creatorId: string;
  title: string;
  description: string;
  solution: string;
  technologies?: Array<string>;
  tags?: string;
  allowComments: boolean;
}

interface ICommentValues {
  comment: string;
  commentorId: string;
  failureId: string;
}

interface IVoteValues {
  voterId: string;
  failureId: string;
}

interface IStarReviewValues {
  failureId: string;
  raterId: string;
  ratingValue: string;
}

const createFailure = async (failure: FailureValues, creatorId: string) => {
  // TODO: validate inputs
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

  return savedFailure;
};

const getAllFailures = async () => {
  const allFailures = await Failure.find({});
  // fetch only username and avatar
  const creator = await User.findById("63e39de4c83814d637d54042");

  console.log(creator);
  // this needs to be mapped for a failure like on frontend
  return allFailures;
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
  // TODO: check taht voterId is not already existing in votes
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
  const userRating = await StarRating.findOne({ givenBy: raterId });

  if (!userRating) {
    const starRatingModel = new StarRating({
      starRating: ratingValue,
      givenBy: raterId,
    });

    const savedStarRating = await starRatingModel.save();
    await Failure.findByIdAndUpdate(failureId, { $push: { starRatings: savedStarRating.id } });
    return savedStarRating;
  } else {
    await StarRating.findOneAndUpdate({ givenBy: raterId }, { starRating: ratingValue });
  }

  return "OK";
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
      $project: {
        starReviews: 1,
      },
    },
  ]);
  const reviewAsArray = ratingsData[0].starReviews;

  return {
    ratingAverage: getReviewAverage(reviewAsArray),
    userRating: userId ? getUserReview(reviewAsArray, userId) : null,
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
  await Failure.findByIdAndUpdate(failureId, { enableComments: valueToToggle });
};

const getFailureOfTheWeek = async () => {
  const lastWeeksNumber = getNumberOfWeek() - 1;

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
                lastWeeksNumber,
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
      $project: {
        votesData: 0,
        weeksVotes: 0,
        starRatings: 0,
        comments: 0,
        votes: 0,
        tags: 0,
        __v: 0,
        enableComments: 0,
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
        "creator.passwordHash": 0,
        "creator.__v": 0,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return weekFailure;
};

const getNumberOfWeek = () => {
  const today: any = new Date();
  const firstDayOfYear: any = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export default {
  createFailure,
  getAllFailures,
  addCommentToFailure,
  addVoteToFailure,
  deleteVoteFromFailure,
  addStarRating,
  getRatingData,
  getVoteData,
  toggleFailureCommentingAllowance,
  getFailureOfTheWeek,
};
