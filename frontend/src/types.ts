export interface Creator {
  name: string,
  avatar: string
}

export interface Failure {
  id: number,
  creator: Creator,
  title: string,
  description: string,
  solution: string,
  technologies: Array<string>,
  starRating: string,
  tags: Array<string>,
  votes: number,
  timeOfCreation: string,
  comments: Array<string>
}