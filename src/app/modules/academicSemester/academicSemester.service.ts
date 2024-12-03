import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  // semester name == semester code
  // 03 !== 01
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  return result;
};

const getAllAcademicSemesters = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemester = async (_id: string) => {
  const result = await AcademicSemester.findById(_id);
  return result;
};

const updateAcademicSemester = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const result = await AcademicSemester.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
