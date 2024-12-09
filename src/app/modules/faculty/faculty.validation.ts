import { z } from 'zod';

const facultyNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string(),
});

const updateFacultyNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const CreateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      designation: z.string(),
      name: facultyNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export const UpdateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: facultyNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});
