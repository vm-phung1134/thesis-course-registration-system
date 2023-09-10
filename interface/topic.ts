import { IAuthObject } from "./auth";

export interface ITopicObject {
  id?: string;
  title: string;
  type: string;
  technologies: string[];
  memberQuantiy: number;
  student: IAuthObject;
  memberEmail: string;
  description: string;
}
