import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

export const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

// for create check if academic faculty is exists not or in database
academicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isAcademicFacultyExists) {
    throw new Error('This Academic Faculty already exits');
  }
  next();
});

// for update check id id is exists or not
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isAcademicFacultyExists = await AcademicFaculty.findOne(query);

  if (!isAcademicFacultyExists) {
    throw new Error('This Academic faculty does not exists');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
