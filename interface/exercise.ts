import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IClassroomObject } from "./classroom";
import { IGeneralLinkAttachment } from "./submit";

export interface IExerciseObject {
  id?: string;
  uid: string;
  title: string;
  classroom: IClassroomObject;
  category: ICategoryObject;
  lecturer: IAuthObject;
  description: string;
  deadline: string;
  type: string;
  attachments?: (any | IGeneralLinkAttachment | File)[];
}
