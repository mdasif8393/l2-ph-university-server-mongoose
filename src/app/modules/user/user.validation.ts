import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string({
    required_error: 'id is required',
    invalid_type_error: 'id must be a string',
  }),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .max(20, { message: "Password can't be more than 20 characters" }),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(['admin', 'faculty', 'student']),
  isDeleted: z.boolean().default(false).optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
});

export const userValidation = {
  userValidationSchema,
};
