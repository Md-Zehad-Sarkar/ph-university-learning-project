import { TAcademicFaculty } from './academic.faculty.interface';
import { AcademicFaculty } from './academic.faculty.model';

//create academic faculty
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

//get all academic faculty
const getAllAcademicFacultiesFromDB = async () => {
  const result = AcademicFaculty.find();
  return result;
};

//get single academic faculty
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

//update academic faculty
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
