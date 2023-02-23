import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "../types";

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser & Document>("User", userSchema);
