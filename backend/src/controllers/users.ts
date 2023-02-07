import express, { Request, Response } from "express";
import { TOKEN_EXPIRING_TIME, SECRET } from "../utils/config";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { IDBUser } from "../types";

const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(req.body);

  const passwordHash = await bcrypt.hash(password, 15);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  // log the user in when registering
  const token = jwt.sign(
    { username: savedUser.username, id: savedUser.id },
    SECRET,
    {
      expiresIn: TOKEN_EXPIRING_TIME,
    }
  );

  res
    .status(201)
    .send({ token, username: savedUser.username, id: savedUser.id });
});

userRouter.put("/:userId", async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.userId;

  // check that currentPassowrd is correct
  const user: IDBUser | null = await User.findOne({ _id: userId });
  const passwordMatch = await isPasswordMatching(user, currentPassword);

  if (!user || !passwordMatch) {
    return res.status(401).json({
      error: "unauthorized call",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      error: "Passwords doesn't match",
    });
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 15);
  await User.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });

  res.status(200).json({
    isSuccess: true,
  });
});

const isPasswordMatching = async (user: IDBUser | null, password: string) => {
  return user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
};

export default userRouter;
