import { IAuthObject } from "./auth";

export interface ITopicKeyObject {
  id?: string;
  value: string;
  label: string;
}

export interface IClassroomObject {
  id: string;
  lecturer: IAuthObject;
  classCourse: string;
  quantityStudent: number;
  status: string;
  topic?: ITopicKeyObject[];
}
