import { IAuthObject } from "./auth";

export interface ICommentObject {
  id?: string;
  user: IAuthObject;
  content: string;
  postId: string;
}
