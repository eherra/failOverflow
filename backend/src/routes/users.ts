import express, { Request, Response } from "express";
import userService from "../services/userService";

const userRouter = express.Router();

/**
 * POST /api/users
 * @summary Creates new user, and login the user
 * @return {} 201 - Created user and its generated token
 */
userRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const createdUser = await userService.createUser(username, password);
    res.status(201).send(createdUser);
  } catch (err) {
    res.status(400).json({
      error: "Something went wrong",
    });
  }
});

/**
 * PUT /api/users/:userId
 * @summary Changes users password if params info matches
 * @param {} request.body.required - currentPassword, newPassword, confirmPassword
 * @return {} 200 - success
 */
userRouter.put("/:userId", async (req: Request, res: Response) => {
  // validate these inputs
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.userId;

  try {
    await userService.changePassword({ currentPassword, newPassword, confirmPassword, userId });
    res.status(200).json({
      isSuccess: true,
    });
  } catch (err: any) {
    const { message, statusCode } = err;
    res.status(statusCode || 400).json({
      error: message || "Something went wrong",
    });
  }
});

export default userRouter;
