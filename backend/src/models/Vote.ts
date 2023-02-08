import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IVote } from "../types";

const voteSchema: Schema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

voteSchema.plugin(uniqueValidator);

export default mongoose.model<IVote & Document>("Vote", voteSchema);
