export interface IFailure {
  creator: ICreator;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
  allowComments: boolean;
  comments: Array<IComment>;
  starRatings: Array<IStarReview>;
  votes: Array<IVote>;
}

export interface IAllFailure extends Omit<IFailure, "comments" | "starRatings" | "votes"> {
  _id: string;
}

export interface IUserAllFailure extends IAllFailure {
  comments: Array<IComment>;
}

export interface ICreatedFailure extends IFailure {
  _id: string;
}

export interface ICreator {
  userId: string;
  username: string;
  avatarUrl?: string;
}

export interface IVote {
  givenBy: string;
  createdAt: string;
}

export interface IStarReview extends IVote {
  starReview: number;
}

export interface IComment extends IVote {
  comment: string;
}

export interface IFailureOfTheMonth
  extends Omit<IFailure, "votes" | "starRating" | "comments" | "allowComments"> {
  reviewAverage?: number;
}

export interface IFailureOfTheWeek
  extends Omit<IFailure, "votes" | "starRating" | "comments" | "allowComments"> {
  totalVotes: number;
}

export interface IFailureDistribution {
  date: string;
  amount: number;
}

export type IVoteDistribution = IFailureDistribution;

export interface IVotesData {
  hasUserVoted: boolean | null;
  votesAmount: number;
}

export interface IRatingData {
  userRating: number | null;
  ratingAverage: number;
}

export interface IUser {
  username: string;
  passwordHash: string;
  avatarUrl?: string;
}

export interface IUserDTO extends IUser {
  _id: string;
}

export interface INewFailureValues {
  creatorId: string;
  title: string;
  description: string;
  solution: string;
  allowComments: boolean;
  technologies?: Array<string>;
}

export interface ICommentValues {
  comment: string;
  commentorId: string;
  failureId: string;
}

export interface IVoteValues {
  voterId: string;
  failureId: string;
}

export interface IStarReviewValues {
  failureId: string;
  raterId: string;
  ratingValue: number;
}
