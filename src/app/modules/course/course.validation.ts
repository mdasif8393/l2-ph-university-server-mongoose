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

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourse: z.array(preRequisiteValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
