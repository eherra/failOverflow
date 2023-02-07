import express, { Request, Response } from "express";
import { SECRET, TOKEN_EXPIRING_TIME } from "../utils/config";
import { IDBUser } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: IDBUser | null = await User.findOne({ username });
  const passwordMatch = await isPasswordMatching(user, password);

  if (!user || !passwordMatch) {
    return res.status(401).json({
      error: "incorrect username or password",
    });
  }

  const token = jwt.sign({ username: user.username, id: user._id }, SECRET, {
    expiresIn: TOKEN_EXPIRING_TIME,
  });

  res.status(200).send({ token, username: user.username, id: user._id });
});

const isPasswordMatching = async (user: IDBUser | null, password: string) => {
  return user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
};

export default loginRouter;
