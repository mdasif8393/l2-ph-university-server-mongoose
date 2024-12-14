import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // check if the user is exists in User model
  const isUserExists = await User.findOne({ id: payload.id });
  console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  // check use status is blocked or not
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists.password,
  );
  console.log(isPasswordMatch);

  return null;
};

export const AuthServices = {
  loginUser,
};
