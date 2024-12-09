import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CreateFacultyValidationSchema } from '../faculty/faculty.validation';
import { CreateStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(CreateFacultyValidationSchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;
