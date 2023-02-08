import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IComment } from "../types";

const commentSchema: Schema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.plugin(uniqueValidator);

export default mongoose.model<IComment & Document>("Comment", commentSchema);
