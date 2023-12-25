import { IAuthObject } from "./auth";

export interface ITopicObject {
  id?: string;
  title: string;
  typeTopic: string;
  memberQuantity: number;
  student: IAuthObject;
  memberEmail: string;
  description: string;
}
