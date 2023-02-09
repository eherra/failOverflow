import express, { Request, Response } from "express";
import { IUserDTO } from "../types";
import { generateJwtToken } from "./utils/tokenUtils";
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
    const token = generateJwtToken(loggedUser);
    return res.status(200).send({ token, username: loggedUser.username, id: loggedUser._id });
  } catch (err: any) {
    console.log("Error while login user");
    console.log(err);
    return res.status(401).json({
      error: err.message,
    });
  }
});

export default loginRouter;
