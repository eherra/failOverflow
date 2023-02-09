import Failure from "../models/Failure";
import Comment from "../models/Comment";
import User from "../models/User";

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

  console.log("perkeler");
  console.log(creator);
  console.log(allFailures);
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

export default { createFailure, getAllFailures, addCommentToFailure };
