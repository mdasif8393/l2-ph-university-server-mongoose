import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'oldPassword is required' }),
    newPassword: z.string({ required_error: 'newPassword is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'refreshToken is required' }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
};
