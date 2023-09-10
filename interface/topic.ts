import { IAuthObject } from "./auth";

export interface ITopicObject {
  title: string;
  type: string;
  technologies: string[];
  memberQuantiy: number;
  student: IAuthObject;
  memberEmail: string;
  description: string;
}
