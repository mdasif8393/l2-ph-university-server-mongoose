import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGender = 'male' | 'female' | 'other';

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TFaculty = {
  id: string;
  designation: string;
  gender: TGender;
  name: TFacultyName;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted?: boolean;
  bloogGroup?: TBloodGroup;
};
