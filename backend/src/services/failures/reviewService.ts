import Failure from "../../models/Failure";
import StarRating from "../../models/StarRating";
import { ObjectId } from "mongodb";
import { getUserReview } from "../utils/ratingUtils";
import { IStarReviewValues } from "../../types";

const addReviewToFailure = async ({ ratingValue, failureId, raterId }: IStarReviewValues) => {
  const foundReview: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "starratings",
        localField: "starRatings",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $project: {
        review: {
          $filter: {
            input: "$reviews",
            as: "review",
            cond: {
              $eq: ["$$review.givenBy", new ObjectId(raterId)],
            },
          },
        },
      },
    },
  ]);
  const reviewObj = foundReview[0].review[0];

  // if user hasn't yet given any review for the failure, then object is empty
  if (!reviewObj) {
    const starRatingModel = new StarRating({
      starRating: ratingValue,
      givenBy: raterId,
    });

    const savedStarRating = await starRatingModel.save();
    await Failure.findByIdAndUpdate(failureId, { $push: { starRatings: savedStarRating.id } });
  } else {
    const reviewId = reviewObj._id.toString();
    await StarRating.findByIdAndUpdate(reviewId, {
      starRating: ratingValue,
    });
  }

  // after rating updates done, fetch updated data
  const ratingData = await getReviewData(failureId, raterId);
  return ratingData;
};

const getReviewData = async (failureId: string, userId: string) => {
  const ratingsData: any = await Failure.aggregate([
    {
      $match: {
        _id: new ObjectId(failureId),
      },
    },
    {
      $lookup: {
        from: "starratings",
        localField: "starRatings",
        foreignField: "_id",
        as: "starReviews",
      },
    },
    {
      $addFields: {
        reviewAverage: {
          $avg: {
            $map: {
              input: "$starReviews",
              in: "$$this.starRating",
            },
          },
        },
      },
    },
    {
      $project: {
        starReviews: 1,
        reviewAverage: 1,
      },
    },
  ]);
  const reviewObj = ratingsData[0];
  return {
    ratingAverage: reviewObj.reviewAverage,
    userRating: userId ? getUserReview(reviewObj.starReviews, userId) : null,
  };
};

export default { addReviewToFailure, getReviewData };
