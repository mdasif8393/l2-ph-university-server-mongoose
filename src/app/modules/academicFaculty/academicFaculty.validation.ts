import { z } from 'zod';

const createAcademicFaculty = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty Name must be a string',
      required_error: 'Academic Faculty Name is required',
    }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFaculty,
};
