import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IFailure } from "../types";

const failureSchema: Schema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  technologies: {
    type: Array<string>,
    required: false,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  allowComments: {
    type: Boolean,
    required: true,
    default: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Comment",
      default: [],
    },
  ],
  starRatings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "StarRating",
      default: [],
    },
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Vote",
      default: [],
    },
  ],
});

failureSchema.plugin(uniqueValidator);

export default mongoose.model<IFailure & Document>("Failure", failureSchema);
