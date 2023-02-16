import User from "../models/User";
import { IUserDTO } from "../types";
import { generatePasswordHash, isPasswordMatching } from "./utils/passwordUtils";
import { generateJwtToken } from "./utils/tokenUtils";

interface IChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  userId: string;
}

const createUser = async (username: string, password: string) => {
  const passwordHash = await generatePasswordHash(password, 15);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  // login the user in when registering
  const token = generateJwtToken(savedUser);

  return {
    token: token,
    username: savedUser.username,
    id: savedUser.id,
  };
};

const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
  userId,
}: IChangePasswordValues) => {
  // check that currentPassowrd is correct
  const user: IUserDTO | null = await User.findOne({ _id: userId });
  const passwordMatch = await isPasswordMatching(user, currentPassword);

  if (!user || !passwordMatch) {
    throw Error("Unauthorized");
  }

  if (newPassword !== confirmPassword) {
    throw Error("PasswordMismatch");
  }

  const newPasswordHash = await generatePasswordHash(newPassword, 15);
  await User.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });
};

export default { createUser, changePassword };
