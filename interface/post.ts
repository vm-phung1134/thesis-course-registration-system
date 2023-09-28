import { IAuthObject } from "./auth";
import { ICategoryObject } from "./category";
import { IClassroomObject } from "./classroom";
import { IGeneralLinkAttachment } from "./submit";

export interface IPostObject {
  id?: string;
  uid: string;
  title: string;
  type: string;
  category: ICategoryObject;
  classroom: IClassroomObject;
  lecturer: IAuthObject;
  description: string;
  attachments?: (any | IGeneralLinkAttachment | File)[];
}
