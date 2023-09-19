import { IPostObject } from "@/interface/post";
import Cookies from "js-cookie";

export interface PostState {
  posts: IPostObject[];
  post: IPostObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
