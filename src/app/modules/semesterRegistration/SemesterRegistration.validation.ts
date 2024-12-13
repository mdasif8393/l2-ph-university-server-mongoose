import { z } from 'zod';
import { SemesterRegistrationStatuses } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    acaDemicSemester: z.string(),
    status: z
      .enum([...SemesterRegistrationStatuses] as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredits: z.number().optional(),
    maxCredits: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
};
