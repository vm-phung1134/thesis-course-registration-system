import { IMemberObject } from "@/interface/member";
import Cookies from "js-cookie";

export interface MemberState {
  members: IMemberObject[];
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
