import { IAuthObject } from "@/interface/auth";
import Cookies from "js-cookie";

export interface CouncilDefState {
  councils: IAuthObject[];
  council: IAuthObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
