import express, { Request, Response } from "express";
import { TOKEN_EXPIRING_TIME, SECRET } from "../utils/config";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

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

export default userRouter;
