import Failure from "../../models/Failure";
import Vote from "../../models/Vote";
import { hasUserVoted } from "../utils/ratingUtils";
import { IVoteValues } from "../../types";
import { ObjectId } from "mongodb";

const addVoteToFailure = async ({ voterId, failureId }: IVoteValues) => {
  const voteModel = new Vote({
    givenBy: voterId,
  });

  const savedVote = await voteModel.save();
  await Failure.findByIdAndUpdate(failureId, { $push: { votes: savedVote.id } });

  return savedVote;
};

const deleteVoteFromFailure = async ({ voterId, failureId }: IVoteValues) => {
  const vote = await Vote.findOne({ givenBy: voterId });
  await Failure.findByIdAndUpdate(failureId, { $pull: { votes: new ObjectId(vote?._id) } });
  await Vote.findByIdAndDelete(vote?._id);
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

export default { addVoteToFailure, deleteVoteFromFailure, getVoteData };
