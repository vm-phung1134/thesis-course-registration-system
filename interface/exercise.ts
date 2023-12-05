import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IGeneralLinkAttachment } from "./submit";

export interface IDateTime {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  nanos: number;
}

export interface IExerciseObject {
  id?: string;
  title: string;
  classroomID: string;
  category: ICategoryObject;
  author: IAuthObject;
  description: string;
  deadline: IDateTime | any;
  attachments?: IGeneralLinkAttachment[] | any[];
  createAt?: string;
  updateAt?: string;
}

export interface IExerciseObjectInput {
  id?: string;
  title: string;
  classroomID: string;
  categoryID: string;
  authorID: string;
  description: string;
  deadline: string;
  attachments?: IGeneralLinkAttachment[] | any[];
}
