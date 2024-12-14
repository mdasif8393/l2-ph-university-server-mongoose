import { z } from 'zod';
import { Days } from './OfferedCourse.constant';

const timeSchema = z.string().refine(
  // check time format is ok or not HH:MM 23:59
  // time == startTime
  // if return false then show error message
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: `Invalid time format, expected "HH:MM" in 24H format`,
  },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicSemester: z.string().optional(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeSchema,
      endTime: timeSchema,
    })
    // check endTime > startTime or not
    // if end less than start then show error
    .refine((body) => {
      const start = new Date(`1970-01-01T${body?.startTime}:00`);
      const end = new Date(`1970-01-01T${body?.endTime}:00`);

      return end > start;
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeSchema, // HH: MM   00-23: 00-59

      endTime: timeSchema,
    }) // check endTime > startTime or not
    // if end less than start then show error
    .refine((body) => {
      const start = new Date(`1970-01-01T${body?.startTime}:00`);
      const end = new Date(`1970-01-01T${body?.endTime}:00`);

      return end > start;
    }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
