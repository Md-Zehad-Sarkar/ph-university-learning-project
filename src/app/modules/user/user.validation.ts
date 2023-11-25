export type TUser = {
  id: string;
  password: string;
  needPasswordChanged: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
