import { AcademicSemesterNameAndCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // checking semester name and code. if not matched send a error
  if (AcademicSemesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code.please type valid one');
  }
  //create into database
  const result = await AcademicSemester.create(payload);
  return result;
};

//get all semester
const getAllAcademicSemesterFromDB = async () => {
  const allSemester = await AcademicSemester.find();
  return allSemester;
};

//get single semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const singleSemester = await AcademicSemester.findById(id);
  return singleSemester;
};

//update single semester particular
const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const updateSemester = await AcademicSemester.findByIdAndUpdate( {_id:id} , payload, {
    new: true,
  });
  return updateSemester;
};
export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
