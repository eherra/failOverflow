import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IStarReview } from "../types";

const starRatingSchema: Schema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  starReview: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

starRatingSchema.plugin(uniqueValidator);

export default mongoose.model<IStarReview & Document>(
  "StarRating",
  starRatingSchema
);
