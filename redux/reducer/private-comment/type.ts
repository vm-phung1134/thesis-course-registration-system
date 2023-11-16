import { ICommentObject } from "@/interface/comment";
import { IPrivateComment } from "@/interface/privateComment";
import Cookies from "js-cookie";

export interface PrivateCommentState {
  priComments: IPrivateComment[];
  priComment: IPrivateComment;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
