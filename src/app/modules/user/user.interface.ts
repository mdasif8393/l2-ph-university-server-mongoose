/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
}

// check is password match and isUser exists using static
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPassWordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
