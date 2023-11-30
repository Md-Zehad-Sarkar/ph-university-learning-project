import { TAcademicDepartment } from './academic.department.interface';
import { AcademicDepartment } from './academic.department.model';

//create academic department
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

//get all academic department
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

//get single academic department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

//update academic department
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findById({_id:id},payload,{new:true});
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
