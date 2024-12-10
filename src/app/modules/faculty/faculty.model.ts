import { model, Schema } from 'mongoose';
import { BloodGroup, Gender } from './faculty.constant';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  name: { type: facultyNameSchema, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true, enum: Gender },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String },
  academicDepartment: { type: Schema.Types.ObjectId, required: true },
  isDeleted: { type: Boolean, default: false },
  bloogGroup: { type: String, enum: BloodGroup, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
