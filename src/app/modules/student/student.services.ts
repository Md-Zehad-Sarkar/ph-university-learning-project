import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.constants';

//get all student
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // //query syntax: {email:{$regex: query.searchTerm, $options: i}}
  // const queryObj = { ...query };

  // const studentSearchableField = [
  //   'email',
  //   'name.firstName',
  //   'address.presentAddress',
  // ];

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     //nested populate korte hole path a parent r populate a child property dite hobe.
  //     path: 'academicDepartment', //parent child
  //     populate: 'academicFaculty', //child
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  ////// // use for upper code with class
  const studentQuery = new QueryBuilder(
    Student.find().populate('admissionSemester').populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

//get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById( id )
    .select({ password: 0 })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  //if id not found send this error message
  if (!result) {
    throw new AppError(404, `Single student not found with this id ${id}`);
  }
  return result;
};

//update single student
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  //destructure for update dynamically student data update non-primitive
  const { name, address, guardian, localGuardian, ...restStudentData } =
    payload;

  const modifiedUpdateData: Record<string, unknown> = { ...restStudentData };

  //ekhane name jodi object hoy and tahole object guloke array baniye tar length check kore ekti for loop calano hoyeche .for loop kore key and value pairs kore Object.entries() mane properties value diye. modifiedUpdateData[`$name${key}`] = value; eta diye key er value gulo bose jay .
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdateData[`address.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(
    id,
    modifiedUpdateData,
    {
      new: true,
      runValidators: true,
    },
  );

  //if id not found send this error message
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Single student can not update with this id ${id}`,
    );
  }
  return result;
};

// delete student (update field isDeleted:false to { isDeleted: true } )
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }
    const deletedUser = await User.findByIdAndUpdate(
       id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

// delete all student
const deleteAllStudentFromDB = async () => {
  const student = await Student.deleteMany();
  return student;
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
  deleteAllStudentFromDB,
};
