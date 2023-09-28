import { IAuthObject } from "./auth";

export interface IGeneralLinkAttachment {
  id: string;
  name: string;
  src: string;
}

export interface ISubmitObject {
  id?: string;
  uid: string;
  exerciseId: string;
  student: IAuthObject;
  attachments: (IGeneralLinkAttachment | File | any)[];
  status: string;
}
