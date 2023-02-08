import express, { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import { IUserDTO } from "../types";
import { isPasswordMatching, generatePasswordHash } from "./utils/passwordUtils";
import { generateJwtToken } from "./utils/tokenUtils";

const userRouter = express.Router();

/**
 * POST /api/users
 * @summary Creates new user, and login the user
 * @return {} 201 - Created user and its generated token
 */
userRouter.post("/", (async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const passwordHash = await generatePasswordHash(password, 15);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  // login the user in when registering
  const token = generateJwtToken(savedUser);

  return res.status(201).send({ token, username: savedUser.username, id: savedUser.id });
}) as RequestHandler);

/**
 * PUT /api/users/:userId
 * @summary Changes users password if params info matches
 * @param {} request.body.required - currentPassword, newPassword, confirmPassword
 * @return {} 200 - success
 */
userRouter.put("/:userId", (async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.userId;

  // check that currentPassowrd is correct
  const user: IUserDTO | null = await User.findOne({ _id: userId });
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

  const newPasswordHash = await generatePasswordHash(newPassword, 15);
  await User.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });

  res.status(200).json({
    isSuccess: true,
  });
}) as RequestHandler);

export default userRouter;
