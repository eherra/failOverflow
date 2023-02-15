export interface Creator {
  userId: string;
  username: string;
  avatar: string;
}

export interface IComment {
  comment: string;
  createdAt: string;
  _id: string;
}

export interface Failure {
  id: string | undefined;
  _id: string;
  creator: Array<Creator>;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  starRating: string;
  tags: Array<string>;
  votes: number;
  createdAt: string;
  allowComments: boolean;
  comments: Array<IComment>;
}

export interface ILoginValues {
  username: string;
  password: string;
}

export interface IRegisterValues {
  username: string;
  password: string;
  avatarFile?: File;
}

export interface IPasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IFailureOfTheMonth {
  _id: string;
  creator: Array<Creator>;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
  reviewAverage?: number;
}

export interface IFailureOfTheWeek {
  _id: string;
  creator: Array<Creator>;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  totalVotes: number;
  createdAt: string;
}
