import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    isDeleted: { type: Boolean, required: true },
    status: { type: String, enum: ['in-progress', 'blocked'] },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
