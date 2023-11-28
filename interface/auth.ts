import { ITopicObject } from "./topic";

export interface IAuthObject {
  id: string;
  name: string;
  photoSrc: string;
  role?: string;
  email: string;
  phone?: string;
  major?: string;
  class?: string;
  hashedPassword?: string;
  socketId?: string;
  topic?: ITopicObject;
}
