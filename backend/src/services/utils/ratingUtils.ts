export const getUserReview = (data: any, userId: string): number => {
  if (!data.length) return 0;
  const userReview = data.find((obj: any) => obj.givenBy.toString() === userId);
  return userReview ? userReview.starRating : null;
};

export const hasUserVoted = (data: any, userId: string): boolean => {
  if (!data.length) return false;
  return data.some((obj: any) => obj.givenBy.toString() === userId);
};

export const getNumberOfWeek = (currentDate: any) => {
  const firstDayOfYear: any = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
