import { IClassroomObject } from "@/interface/classroom";

export const DATA_CARD_COURSE: IClassroomObject[] = [
  {
    id: "C_1",
    title: "",
    lecturer: {
      id: "GV_1",
      name: "le huynh quoc bao",
      photoSrc: "",
      email: "lhqbao@ctu.edu.vn",
      phone: "123456789",
      major: "Sercurity information",
    },

    codeCourse: "HK1",
    quantity: 5,
    topicTags: [
      {
        id: "T_1",
        label: "Blockchain",
        value: "block-chain",
      },
      {
        id: "T_2",
        label: "Website",
        value: "web",
      },
      {
        id: "T_3",
        label: "Mobile",
        value: "mobile",
      },
    ],
  },
  {
    id: "C_2",
    title: "",
    lecturer: {
      id: "GV_2",
      name: "lam nhut khang",
      photoSrc: "",
      email: "lnkhang@ctu.edu.vn",
      phone: "123456789",
      major: "computer networks",
    },

    codeCourse: "HK1",
    quantity: 5,
    topicTags: [
      {
        id: "T_1",
        label: "AI",
        value: "ai",
      },
      {
        id: "T_2",
        label: "Embedded",
        value: "embedded",
      },
      {
        id: "T_3",
        label: "Networks",
        value: "networks",
      },
    ],
  },
];
