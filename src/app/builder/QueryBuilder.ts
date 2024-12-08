import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>; // like Student model
  public query: Record<string, unknown>; // express query

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // search query method
  // searchableFields come from peremeter
  search(searchableFields: string[]) {
    // searchTerm come from postman queries
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      // const searchQuery = Student.find({
      // code from student.service.ts
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              //   { email: { $regex: 'ravi', $options: 'i' } }
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    // return mother this
    return this;
  }

  // filter query method
  filter() {
    const queryObj = { ...this.query }; // copy

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  }
}

// search query method similar code from student.service.ts
/*
const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      //   { email: { $regex: 'ravi', $options: 'i' } }
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

*/

// filter query method similar code from student.service.ts

/*
      
      // Filter query
  // exclude searchTerm from queryObj
  const queryObj = { ...query };
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
*/
