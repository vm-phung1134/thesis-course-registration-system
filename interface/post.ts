import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IClassroomObject } from "./classroom";

export interface IPostObject {
  id?: string;
  title: string;
  category: ICategoryObject;
  classroom: IClassroomObject;
  lecturer: IAuthObject;
  description: string;
  attachment?: File[] | null;
}
