import { ICommentObject } from "@/interface/comment";
import Cookies from "js-cookie";

export interface CommentState {
  comments: ICommentObject[];
  comment: ICommentObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
