import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";

export interface IExerciseObject {
  id?: string;
  title: string;
  category: ICategoryObject;
  lecturer: IAuthObject;
  description: string;
  deadline: Date;
  score: number;
  type: string;
}
