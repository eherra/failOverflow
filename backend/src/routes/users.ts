import "express-async-errors";
import express, { Request, Response } from "express";
import userService from "../services/userService";

const userRouter = express.Router();

/**
 * POST /api/users
 * @summary Creates new user, and login the user
 * @return {} 201 - Created user and its generated token
 * @return {} 400 - ValidationError if username is taken
 */
userRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const createdUser = await userService.createUser(username, password);
  res.status(201).send(createdUser);
});

/**
 * PUT /api/users/:userId
 * @summary Changes users password if params info matches
 * @param {} req.params.required - userId
 * @param {} request.body.required - currentPassword, newPassword, confirmPassword
 * @return {} 200 - success
 * @return {} 400 - If newPassword and confirmPassword doesn't match
 * @return {} 401 - Unauthorized response if no user found with userId or is user db password
 *                  doesn't match to currentPassword value
 */
userRouter.put("/:userId", async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.userId;
  await userService.changePassword({ currentPassword, newPassword, confirmPassword, userId });
  res.sendStatus(200);
});

export default userRouter;
