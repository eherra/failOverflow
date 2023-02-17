import User from "../models/User";
import { IUserDTO } from "../types";
import { isPasswordMatching } from "./utils/passwordUtils";
import { generateJwtToken } from "./utils/tokenUtils";

const loginUser = async (username: string, password: string) => {
  const user: IUserDTO | null = await User.findOne({ username });
  const passwordMatch = await isPasswordMatching(user, password);

  if (!user || !passwordMatch) {
    throw new Error("UnauthorizedLoginAttempt");
  }
  const token = generateJwtToken(user);

  return {
    user,
    token,
  };
};

export default { loginUser };
