import { IAuthObject } from "./auth";

export interface IStudentDefObject {
  id?: string;
  infor: IAuthObject;
  instructor: IAuthObject;
}
