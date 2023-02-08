import { SECRET, TOKEN_EXPIRING_TIME } from "../../utils/config";
import { IUserDTO } from "../../types";
import jwt from "jsonwebtoken";

export const generateJwtToken = (user: IUserDTO) => {
  return jwt.sign({ username: user.username, id: user._id }, SECRET, {
    expiresIn: TOKEN_EXPIRING_TIME,
  });
};
