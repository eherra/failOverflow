export interface Creator {
  userId: string;
  username: string;
  avatar: string;
}

export interface Failure {
  id: string;
  creator: Creator;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  starRating: string;
  tags: Array<string>;
  votes: number;
  timeOfCreation: string;
  comments: Array<string>;
}
