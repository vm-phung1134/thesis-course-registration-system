import { IAuthObject } from "./auth";
import { IClassroomObject } from "./classroom";

export interface IMemberObject {
  id?: string;
  classroom: IClassroomObject;
  member: IAuthObject;
  status?: string;
}
