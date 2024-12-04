// year semesterCode 4 digit number

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  // example: From 2030010001 return 0001
  return lastStudent?.id ? lastStudent?.id : undefined;
};

// 2030 01 0000
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString(); // 0000 by default

  // 2030 01 0001
  const lastStudentId = await findLastStudentId();

  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear == currentYear
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
