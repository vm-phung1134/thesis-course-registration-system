import { IAuthObject } from "./auth";

export interface IAssessItem {
  id?: string;
  lecturer: IAuthObject;
  point: number;
  comment: string;
}

export interface IPointDefObject {
  id?: string;
  student: IAuthObject;
  assesses: IAssessItem[];
}
