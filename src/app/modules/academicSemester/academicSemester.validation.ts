import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summar', 'Fall']),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
