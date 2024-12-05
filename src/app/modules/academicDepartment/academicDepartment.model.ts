import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

// check if academic depart already exists or not in database for create
academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Academic Department already exists',
    );
  }
  next();
});

// check in update department id is exists or not in database for update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Department does not exists',
    );
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
