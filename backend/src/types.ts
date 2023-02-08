export interface IUser {
  username: string;
  passwordHash: string;
  avatarUrl?: string;
}

export interface IDBUser extends IUser {
  _id: string;
}

export interface IVote {
  id: string;
  givenBy: string;
  createdAt: string;
}

export interface IStarReview extends IVote {
  starReview: number;
}

export interface IComment extends IVote {
  comment: string;
}

export interface IFailure {
  creator: string;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
  tags: Array<string>;
  enableComments: boolean;
  comments: Array<IComment>;
  starRatings: Array<IStarReview>;
  votes: Array<IVote>;
}
