import { IAuthObject } from "./auth";

export interface IGeneralLinkAttachment {
  id: string;
  fileURL: string;
  author: IAuthObject;
  mimeType: string;
  thumbnail: string;
  fileName: string;
}

export interface ISubmitObject {
  id?: string;
  exerciseID: string;
  userID: string;
  attachments: IGeneralLinkAttachment[];
  status: string;
}

export interface ISubmitObjectInput {
  id?: string;
  exerciseID: string;
  authorID: string;
  attachments: (IGeneralLinkAttachment | File | any)[];
  status: string;
}
