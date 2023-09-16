import { IAuthObject } from "@/interface/auth";
import Cookies from "js-cookie";

export interface AuthState {
  auths: IAuthObject[];
  auth: IAuthObject;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const token = Cookies.get('token')
