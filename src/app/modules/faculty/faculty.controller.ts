import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB();

  res.status(200).json({
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
};
