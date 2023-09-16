import { IAuthObject } from "./auth";

export interface ITopicObject {
  id?: string;
  title: string;
  typeTopic: string;
  memberQuantiy: number;
  student: IAuthObject;
  memberEmail: string;
  description: string;
}
