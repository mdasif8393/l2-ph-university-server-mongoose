import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const facultyNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      name: facultyNameValidationSchema,
      designation: z.string(),
      gender: z.enum(Gender as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
      bloogGroup: z.enum(BloodGroup as [string, ...string[]]),
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      name: updateUserNameValidationSchema.optional(),
      designation: z.string().optional(),
      gender: z.enum(Gender as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      bloogGroup: z.enum(BloodGroup as [string, ...string[]]).optional(),
    }),
  }),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
