/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { User } from "../user/user.model";
import { Faculty } from "./faculty.model";
import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { FacultySearchableFields } from "./faculty.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate('academicDepartment');

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteStudentFromDB,
};
