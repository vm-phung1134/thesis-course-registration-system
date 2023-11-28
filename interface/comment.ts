import { IAuthObject } from "./auth";
import { IExerciseObject } from "./exercise";

export interface ICommentObject {
  id?: string;
  user: IAuthObject;
  content: string;
  exercise: IExerciseObject;
}

export interface ICommentObjectInput {
  id?: string;
  userID: string;
  content: string;
  exerciseID: string;
}
