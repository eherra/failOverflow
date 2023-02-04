import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IFailure {
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  comments: Array<string>;
  starRatings: Array<number>;
  votes: Array<string>;
  timeOfCreation: string;
  tags: Array<string>;
  user: any;
}

const failureSchema: Schema = new mongoose.Schema({
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
    type: Array<String>,
    required: false,
  },
  comments: {
    type: Array<String>,
    required: false,
  },
  starRatings: {
    type: Array<Number>,
    required: false,
  },
  votes: {
    type: Array<String>, // store here user id who has vote
    required: false,
  },
  timeOfCreation: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<String>,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

failureSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

failureSchema.plugin(uniqueValidator);

export default mongoose.model<IFailure & Document>("Failure", failureSchema);
