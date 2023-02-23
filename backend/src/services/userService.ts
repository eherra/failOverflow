import User from "../models/User";
import { IUserDTO } from "../types";
import { generatePasswordHash, isPasswordMatching } from "./utils/passwordUtils";
import { generateJwtToken } from "./utils/tokenUtils";
import { uploadImageToAWS } from "../aws/s3";

interface IChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  userId: string;
}

const createUser = async (
  username: string,
  password: string,
  file: Express.Multer.File | undefined,
) => {
  const passwordHash = await generatePasswordHash(password, 15);
  if (file) {
    await uploadImageToAWS({ file });
  }
  const user = new User({
    username,
    passwordHash,
    avatarUrl: file?.filename,
  });

  const savedUser = await user.save();
  // login the user in when registering
  const token = generateJwtToken(savedUser);

  return {
    token: token,
    username: savedUser.username,
    avatarUrl: savedUser.avatarUrl,
    id: savedUser.id,
  };
};

const changeAvatar = async (file: Express.Multer.File, userId: string) => {
  const userInfo = await User.findById(userId).select({ avatarUrl: 1 });
  if (userInfo?.avatarUrl) {
    await uploadImageToAWS({ file, awsFileKey: userInfo.avatarUrl });
    return userInfo.avatarUrl;
  } else {
    await uploadImageToAWS({ file });
    await User.findByIdAndUpdate(userId, { avatarUrl: file.filename });
    return file.filename;
  }
};

const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
  userId,
}: IChangePasswordValues) => {
  // check that currentPassword is correct
  const user: IUserDTO | null = await User.findById(userId);
  const passwordMatch = await isPasswordMatching(user, currentPassword);

  if (!user || !passwordMatch) {
    throw Error("UnauthorizedPasswordChange");
  }

  if (newPassword !== confirmPassword) {
    throw Error("PasswordMismatch");
  }

  const newPasswordHash = await generatePasswordHash(newPassword, 15);
  await User.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });
};

export default { createUser, changeAvatar, changePassword };
