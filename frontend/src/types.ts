export interface IComment {
  id: string;
  comment: string;
  createdAt: string;
}

export interface ICreator {
  userId: string;
  username: string;
  avatarUrl?: string;
}

export interface IFailure {
  _id: string;
  creator: Array<ICreator>;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  starRating: string;
  votes: number;
  createdAt: string;
  allowComments: boolean;
  comments: Array<IComment>;
}

export interface ILoginValues {
  username: string;
  password: string;
}

export interface IRegisterValues extends ILoginValues {
  avatarFile?: File;
}

export interface IPasswordChangeFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IFailureOfTheMonth
  extends Omit<IFailure, 'votes' | 'starRating' | 'comments' | 'allowComments'> {
  reviewAverage?: number;
}

export interface IFailureOfTheWeek
  extends Omit<IFailure, 'votes' | 'starRating' | 'comments' | 'allowComments'> {
  totalVotes: number;
}
