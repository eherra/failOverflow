import User from "../models/User";
import { IUserDTO } from "../types";
import { isPasswordMatching } from "./utils/passwordUtils";

const loginUser = async (username: string, password: string): Promise<IUserDTO> => {
  const user: IUserDTO | null = await User.findOne({ username });
  const passwordMatch = await isPasswordMatching(user, password);

  if (!user || !passwordMatch) {
    throw new Error("incorrect username or password");
  }

  return user;
};

export default { loginUser };
