export const getReviewAverage = (data: any): number => {
  const rates = data.map((obj: any) => obj.starRating);
  return rates.reduce((a: number, b: number) => a + b) / rates.length;
};

export const getUserReview = (data: any, userId: string): number => {
  const userReview = data.find((obj: any) => obj.givenBy.toString() === userId);
  return userReview ? userReview.starRating : null;
};

export const hasUserVoted = (data: any, userId: string) => {
  return data.some((obj: any) => obj.givenBy.toString() === userId);
};
