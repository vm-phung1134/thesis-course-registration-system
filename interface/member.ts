import { IAuthObject } from "./auth";
import { IClassroomObject } from "./classroom";

export interface IMemberObject {
  id: string;
  classroom: IClassroomObject;
  member: IAuthObject;
  registerDefense: boolean;
  status?: string;
}

export interface IMemberObjectInput {
  classroomID: string;
  memberID: string;
  registerDefense: boolean;
  status?: string;
}
