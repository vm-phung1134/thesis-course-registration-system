import { IUploadReportObject } from "@/interface/upload";
import Cookies from "js-cookie";

export interface UploadReportState {
  uploads: IUploadReportObject[];
  upload: IUploadReportObject;
  isLoading: boolean;
  error: string | null;
}

export const token = Cookies.get("token");
