import { IAuthObject } from "./auth";
import { ICourseObject } from "./course";

export interface IMemberObject {
  classroom: ICourseObject; // classroomId
  members: IAuthObject[];
}
