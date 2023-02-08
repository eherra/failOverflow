import express, { Request, Response } from "express";
import { IUserDTO } from "../types";
import User from "../models/User";
import { isPasswordMatching } from "./utils/passwordUtils";
import { generateJwtToken } from "./utils/tokenUtils";

const loginRouter = express.Router();

/**
 * POST /api/login
 * @summary Logins user
 * @return {} 200 - Login user info and token
 * @return {} 401 - Unauthorized response if login credentials doesn't match
 */
loginRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: IUserDTO | null = await User.findOne({ username });
  const passwordMatch = await isPasswordMatching(user, password);

  if (!user || !passwordMatch) {
    return res.status(401).json({
      error: "incorrect username or password",
    });
  }

  const token = generateJwtToken(user);
  res.status(200).send({ token, username: user.username, id: user._id });
});

export default loginRouter;
