import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>; // like Student model
  public query: Record<string, unknown>; // express query

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
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

  // search query method
  // searchableFields come from peremeter
  search(searchableFields: string[]) {
    // searchTerm come from postman queries
    const searchTerm = this?.query?.searchTerm || '';
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
    // return mother this for chaining on model
    return this;
  }

  // filter query method similar code from student.service.ts
  /*
      
      // Filter query
      // exclude searchTerm from queryObj
      const queryObj = { ...query };
      const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
      excludeFields.forEach((el) => delete queryObj[el]);

      const filterQuery = searchQuery
        .find(queryObj)
    });
*/

  // filter query method
  filter() {
    const queryObj = { ...this.query }; // copy ll queries

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]); // in queryObj put only filter params

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    // return mother this for chaining on model
    return this;
  }

  // sort query code from student.service.ts
  /*
    let sort = '-createdAAt';
    if (query.sort) {
      sort = (query.sort as string).split(',').join(' ');
    }

    const sortQuery = filterQuery.sort(sort);
  */

  // sort query
  sort() {
    const sort =
      (this.query.sort as string)?.split(',')?.join(' ') || '-createdAAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  // pagination query code from student.service.ts
  /*
    let page = 1;
    let limit = 10;
    let skip = 0;

    if (query.limit) {
      limit = Number(query.limit);
    }

    if (query.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
    }

    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
  */

  // pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // field limiting code in student.service.ts
  /*
  let fields = '-__v';

  // fields: 'name,email' to 'name email'
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;
  */

  // field limiting
  fields() {
    const fields =
      (this.query.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
