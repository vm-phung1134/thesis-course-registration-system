import { IAuthObject } from "./auth";
export interface ICreatedAt {
  seconds: number;
  nanoseconds: number;
}
export interface INotification {
  id?: string;
  senderUser: IAuthObject;
  receiverAuthor: IAuthObject;
  type: string;
  createAt: ICreatedAt;
}
