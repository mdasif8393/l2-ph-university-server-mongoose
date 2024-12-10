import { TBloodGroup, TGender } from './faculty.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const facultySearchableFields = [
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'designation',
  'gender',
];
