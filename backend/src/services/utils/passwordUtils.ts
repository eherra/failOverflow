import { IUserDTO } from "../../types";
import bcrypt from "bcrypt";

export const isPasswordMatching = async (user: IUserDTO | null, password: string) => {
  return user === null ? false : await bcrypt.compare(password, user.passwordHash);
};

export const generatePasswordHash = async (password: string, rounds: number) => {
  const passwordHash = await bcrypt.hash(password, rounds);
  return passwordHash;
};
