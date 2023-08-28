import { ICourseObject } from "@/interface/course";

export const DATA_CARD_COURSE: ICourseObject[] = [
  {
    id: "C_1",
    lecturer: {
      id: "GV_1",
      name: "le huynh quoc bao",
      photoSrc: "",
      token: "",
      email: "lhqbao@ctu.edu.vn",
      phone: "123456789",
      major: "Sercurity information",
    },

    codeCourse: "HK1",
    quantity: 5,
    topicTags: [
      {
        id: "T_1",
        title: "Blockchain",
      },
      {
        id: "T_2",
        title: "Web",
      },
      {
        id: "T_3",
        title: "Mobile",
      },
    ],
  },
  {
    id: "C_2",
    lecturer: {
      id: "GV_2",
      name: "lam nhut khang",
      photoSrc: "",
      token: "",
      email: "lnkhang@ctu.edu.vn",
      phone: "123456789",
      major: "computer networks",
    },

    codeCourse: "HK1",
    quantity: 5,
    topicTags: [
      {
        id: "T_1",
        title: "AI",
      },
      {
        id: "T_2",
        title: "Embedded",
      },
      {
        id: "T_3",
        title: "Networks",
      },
    ],
  },
];
