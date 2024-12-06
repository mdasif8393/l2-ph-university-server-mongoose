import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty reference id is required',
      invalid_type_error: 'academicFaculty reference id must be a string',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be a string',
      })
      .optional(),
  }),
  academicFaculty: z
    .string({
      invalid_type_error: 'academicFaculty reference id must be a string',
    })
    .optional(),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
