import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendInmageToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { CreateStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  // upload image file
  upload.single('file'),
  // json student data
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),

  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe);

router.post('/change-status/:id', auth('admin'), UserControllers.changeStatus);

export const UserRoutes = router;
