import { IAuthObject } from "./auth";
import { IClassroomObject } from "./classroom";

export interface IMemberObject {
  classroom: IClassroomObject;
  member: IAuthObject;
}
