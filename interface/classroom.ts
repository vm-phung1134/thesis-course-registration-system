import { IAuthObject } from "./auth";

export interface ITopicKeyObject {
  id?: string;
  value: string;
  label: string;
}

export interface IClassroomObject {
  id?: string;
  title: string;
  lecturer: IAuthObject;
  codeCourse: string;
  quantity: number;
  topicTags?: ITopicKeyObject[];
  status?: string;
}

export interface IClassroomObjectNew {
  id: string;
  lecturer: IAuthObject;
  classCourse: string;
  quantityStudent: number;
}
