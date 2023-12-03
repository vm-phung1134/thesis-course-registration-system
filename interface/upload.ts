import { IAuthObject } from "@/interface/auth";
import { IGeneralLinkAttachment } from "@/interface/submit";

export interface IUploadReportObject {
  id?: string;
  attachment?: IGeneralLinkAttachment | any;
  author: IAuthObject;
}

export interface IUploadReportObjectInput {
  id?: string;
  attachments?: (IGeneralLinkAttachment | any)[];
  authorID: string;
  status: string;
}
