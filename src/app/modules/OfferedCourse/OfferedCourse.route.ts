import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.patch('/:id', OfferedCourseControllers.updateOfferedCourse);

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB);

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

export const OfferedCourseRoutes = router;
