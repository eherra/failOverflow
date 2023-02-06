export interface IUser {
  username: string;
  passwordHash: string;
  avatarUrl?: string;
  failures?: Array<any>;
}

export interface IDBUser extends IUser {
  _id: string;
}
