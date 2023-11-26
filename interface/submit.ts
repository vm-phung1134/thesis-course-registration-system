import { IAuthObject } from "./auth";

export interface IGeneralLinkAttachment {
  id: string,
  fileURL: string,
  author: IAuthObject,
  mimeType: string,
  thumbnail: string,
  fileName: string,
}

export interface ISubmitObject {
  id?: string;
  uid: string;
  exerciseId: string;
  student: IAuthObject;
  attachments: (IGeneralLinkAttachment | File | any)[];
  status: string;
}
