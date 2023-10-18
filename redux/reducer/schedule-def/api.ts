import { ICouncilDef, IThesisDef } from "@/interface/schedule";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";

const createScheduleDef = createAsyncThunk(
  "schedule/createScheduleDef",
  async (postData: { startTime: Date; endTime: Date }) => {
    const response = await axios.post(
      `http://localhost:5000/api/schedule-report/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create schedule defense");
  }
);

const getScheduleDef = createAsyncThunk("schedule/getScheduleDef", async () => {
  const response = await axios.get(
    `http://localhost:5000/api/schedule-report/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to create schedule defense");
});

const getOneCouncilInSchedule = createAsyncThunk(
  "schedule/getOneCouncilInSchedule",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/schedule-report/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one council");
  }
);

const getScheduleForStudent = createAsyncThunk(
  "schedule/getScheduleForStudent",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/schedule-report/student-schedule/SV5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one council");
  }
);

export {
  createScheduleDef,
  getScheduleDef,
  getOneCouncilInSchedule,
  getScheduleForStudent,
};
