export interface IUser {
  username: string;
  passwordHash: string;
  avatarUrl?: string;
}

export interface IUserDTO extends IUser {
  _id: string;
}

export interface IFailure {
  creator: ICreator;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
  tags: Array<string>;
  allowComments: boolean;
  comments: Array<IComment>;
  starRatings: Array<IStarReview>;
  votes: Array<IVote>;
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
