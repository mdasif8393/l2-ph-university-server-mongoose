import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true,
    maxlength: [20, 'firstName can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    maxlength: [20, 'lastName can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: [true, 'id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user is required'],
      ref: 'User', // User model
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'designation is required'],
      trim: true,
    },
    name: {
      type: facultyNameSchema,
      required: [true, 'name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: [true, 'email is required'] },
    contactNo: { type: String, required: [true, 'contactNo is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergencyContactNo is required'],
    },
    bloogGroup: {
      type: String,
      enum: {
        value: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: { type: String },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty', // model
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment', // model
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
