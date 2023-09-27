import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IClassroomObject } from "./classroom";

export interface IPostObject {
  id?: string;
  uid: string;
  title: string;
  type: string;
  category: ICategoryObject;
  classroom: IClassroomObject;
  lecturer: IAuthObject;
  description: string;
  attachments?: File[] | any[];
}
