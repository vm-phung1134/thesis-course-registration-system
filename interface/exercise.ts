import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IClassroomObject } from "./classroom";

export interface IExerciseObject {
  id?: string;
  uid: string;
  title: string;
  classroom: IClassroomObject;
  category: ICategoryObject;
  lecturer: IAuthObject;
  description: string;
  deadline: string;
  score: number;
  type: string;
  attachment?: File[];
}
