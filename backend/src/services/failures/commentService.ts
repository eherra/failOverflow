import Failure from "../../models/Failure";
import Comment from "../../models/Comment";
import { ObjectId } from "mongodb";
import { ICommentValues } from "../../types";

const addCommentToFailure = async ({ comment, commentorId, failureId }: ICommentValues) => {
  const commentModel = new Comment({
    givenBy: commentorId,
    comment: comment,
  });
  const savedComment = await commentModel.save();
  await Failure.findByIdAndUpdate(failureId, { $push: { comments: savedComment.id } });

  return savedComment;
};

const toggleFailureCommentingAllowance = async (failureId: string, valueToToggle: boolean) => {
  await Failure.findByIdAndUpdate(failureId, { allowComments: valueToToggle });
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
      $sort: {
        "comments.createdAt": -1,
      },
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
        "comments.givenBy": 0,
      },
    },
  ]);
  return commentsData.length ? commentsData[0]?.comments : null;
};

export default {
  addCommentToFailure,
  toggleFailureCommentingAllowance,
  getFailureComments,
};
