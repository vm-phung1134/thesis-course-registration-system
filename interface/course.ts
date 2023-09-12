import { IAuthObject } from "./auth";

export interface ITopicKeyObject {
  id?: string;
  value: string;
  label: string;
}

export interface ICourseObject {
  id?: string;
  lecturer: IAuthObject;
  codeCourse: string;
  quantity: number;
  topicTags?: ITopicKeyObject[];
}
