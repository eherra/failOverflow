import "express-async-errors";
import express, { Request, Response } from "express";
import { userAuthenticator } from "../utils/middleware";
import { upload } from "../aws/multer";
import userService from "../services/userService";
const userRouter = express.Router();

/**
 * POST /api/users
 * @summary Creates new user, and login the user
 * @return {} 201 - Created user and its generated token
 * @return {} 400 - ValidationError if username is taken
 */
userRouter.post("/", upload.single("avatar"), async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const file: Express.Multer.File | undefined = req.file;

  const createdUser = await userService.createUser(username, password, file);
  res.status(201).send(createdUser);
});

/**
 * PUT /api/users/avatar
 * @summary Updated users avatar
 * @return {} 200 - Success
 * @return {} 400 - If updates didn't succeed
 */
userRouter.put(
  "/avatar",
  userAuthenticator,
  upload.single("avatar"),
  async (req: any, res: Response) => {
    const file = req.file;
    const user = req.user;
    const avatarUrl = await userService.changeAvatar(file, user.id);
    res.status(200).json({ avatarUrl });
  },
);

/**
 * PUT /api/users
 * @summary Changes users password if params info matches
 * @param {} request.body.required - currentPassword, newPassword, confirmPassword
 * @return {} 200 - success
 * @return {} 400 - If newPassword and confirmPassword doesn't match
 * @return {} 401 - Unauthorized response if no user found with userId or is user db password
 *                  doesn't match to currentPassword value
 */
userRouter.put("/", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  await userService.changePassword({
    currentPassword,
    newPassword,
    confirmPassword,
    userId: user.id,
  });
  res.sendStatus(200);
});

/**
 * DELETE /api/users/avatar
 * @summary Deletes users avatar
 * @return {} 200 - Success
 * @return {} 400 - If deletion didn't succeed
 */
userRouter.delete("/avatar", userAuthenticator, async (req: any, res: Response) => {
  const user = req.user;
  await userService.deleteAvatar(user.id);
  res.sendStatus(200);
});

export default userRouter;
