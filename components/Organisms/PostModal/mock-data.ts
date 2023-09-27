import { INITIATE_COURSE } from "@/data";
import { IPostObject } from "@/interface/post";

export const DATA_POST_MODAL: IPostObject = {
  id: "1",
  title: "",
  category: {
    id: "C_1",
    label: "Design",
    value: "",
    description: "",
  },
  lecturer: {
    id: "L_1",
    name: "le huynh quoc bao",
    photoSrc: "",
    email: "lhqbao@ctu.edu.vn",
    phone: "",
    major: "",
    class: "",
  },
  description: "",
  uid: "",
  classroom: INITIATE_COURSE,
  type: ""
};
