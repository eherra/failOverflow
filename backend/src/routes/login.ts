import "express-async-errors";
import express, { Request, Response } from "express";
import loginService from "../services/loginService";

const loginRouter = express.Router();

/**
 * POST /api/login
 * @summary Logins user
 * @return {} 200 - Login user info and token
 * @return {} 401 - Unauthorized response if login credentials doesn't match
 */
loginRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { user, token } = await loginService.loginUser(username, password);
  res.status(200).json({ username: user.username, id: user._id, avatarUrl: user.avatarUrl, token });
});

export default loginRouter;
