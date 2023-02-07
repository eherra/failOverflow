import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 15);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

export default userRouter;
