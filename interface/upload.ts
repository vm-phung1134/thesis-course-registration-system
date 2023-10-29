import { IAuthObject } from "@/interface/auth";
import { IGeneralLinkAttachment } from "@/interface/submit";

export interface IUploadReportObject {
  id?: string;
  uid: string;
  attachments?: (any | IGeneralLinkAttachment | File)[];
  student: IAuthObject;
  status: string;
}
