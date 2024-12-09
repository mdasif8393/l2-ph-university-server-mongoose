import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /*
  http://localhost:5000/api/v1/students?searchTerm=ravi&email=ravi@gmail.com&sort=-email&limit=2
  console.log({ query });
  {
  query: {
    searchTerm: 'ravi',
    email: 'ravi@gmail.com',
    sort: '-email',
    limit: '2'
  }
}
  */
  // raw code for search, filter, pagination, sort, limit
  // make another object same as query
  // const queryObj = { ...query };
  // // search query
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     //   { email: { $regex: 'ravi', $options: 'i' } }
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // Filter query
  // exclude searchTerm from queryObj
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]); // in queryObj put only filter params
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('user')
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: { path: 'academicFaculty' },
  //   });
  // sort query
  // let sort = '-createdAAt';
  // if (query.sort) {
  //   sort = (query.sort as string).split(',').join(' ');
  // }
  // const sortQuery = filterQuery.sort(sort);
  // // pagination query with skip and limit
  // let page = 1;
  // let limit = 10;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // field limiting
  // let fields = '-__v';
  // fields: 'name,email' to 'name email'
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
  Postman From
  guardian: {
    fatherOccupation: "Teacher" // [key: value]
  }


  Converted To
  guardian.fatherOccupation: "Teacher"
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      // "name.firstName" = "Mezba"
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
