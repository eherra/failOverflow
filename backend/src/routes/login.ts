import express, { Request, Response } from "express";
import { IUserDTO } from "../types";
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

  try {
    const loggedUser: IUserDTO | null = await loginService.loginUser(username, password);
    res.status(200).send(loggedUser);
  } catch (err: any) {
    console.log("Error while login user");
    console.log(err);
    res.status(401).json({
      error: err.message,
    });
  }
});

export default loginRouter;
