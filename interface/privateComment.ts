import { IAuthObject } from "./auth";

export interface IPrivateCommentItem {
  id: string;
  user: IAuthObject;
  content: string;
}

export interface IPrivateComment {
  id?: string;
  user: IAuthObject;
  lecturer: IAuthObject;
  comments: IPrivateCommentItem[];
}
