import {
  TAcademicSemesterCode,
  TAcademicSemesterNameAndCodeMapper,
  TAcademicSemesterNames,
  TMonths,
} from './academicSemester.interface';

export const AcademicSemesterNameSchema: TAcademicSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCodeSchema: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];
export const AcademicSemesterMonthsSchema: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// checking semester name and code. if not matched send a error
export const AcademicSemesterNameAndCodeMapper: TAcademicSemesterNameAndCodeMapper =
  {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
