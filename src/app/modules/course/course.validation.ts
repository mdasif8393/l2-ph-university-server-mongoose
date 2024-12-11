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

const updatePreRequisiteValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.string().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
