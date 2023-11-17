import { IUnavailableDate } from "@/interface/unavaiableDate";
import Cookies from "js-cookie";

export interface UndateParams {
  idAuth: string;
  idUndate: string;
}

export interface UnavailableDateState {
  unavailableDates: IUnavailableDate[];
  unavailableDate: IUnavailableDate;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
