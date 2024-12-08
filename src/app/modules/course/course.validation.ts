import { z } from 'zod';

const preRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.string().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(preRequisiteValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial();

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
