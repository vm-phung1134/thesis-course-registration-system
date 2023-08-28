import { IAuthObject } from "./auth";

export interface ITopicKeyObject {
  id: string;
  title: string;
}

export interface ICourseObject {
  id: string;
  lecturer: IAuthObject;
  codeCourse: string;
  quantity: number;
  topicTags: ITopicKeyObject[];
}
