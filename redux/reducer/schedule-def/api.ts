import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { apiURL } from "@/data";

const createScheduleDef = createAsyncThunk(
  "schedule/createScheduleDef",
  async (postData: { quantityWeek: number; startDate: string }) => {
    const response = await axios.post(`${apiURL}/schedule-report/`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create schedule defense");
  }
);

const getScheduleDef = createAsyncThunk("schedule/getScheduleDef", async () => {
  const response = await axios.get(`${apiURL}/schedule-report/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to create schedule defense");
});

const getOneCouncilInScheduleStudent = createAsyncThunk(
  "schedule/getOneCouncilInScheduleStudent",
  async (id: string) => {
    const response = await axios.get(
      `${apiURL}/schedule-report/student/${id}`,
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

const getOneCouncilInScheduleLecturer = createAsyncThunk(
  "schedule/getOneCouncilInScheduleLecturer",
  async (id: string) => {
    const response = await axios.get(
      `${apiURL}/schedule-report/lecturer/${id}`,
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
      `${apiURL}/schedule-report/student-schedule/${id}`,
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

const getScheduleForLecturer = createAsyncThunk(
  "schedule/getScheduleForLecturer",
  async (id: string) => {
    const response = await axios.get(
      `${apiURL}/schedule-report/lecturer-schedule/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one schedule for lecturer");
  }
);

export {
  createScheduleDef,
  getScheduleDef,
  getOneCouncilInScheduleStudent,
  getOneCouncilInScheduleLecturer,
  getScheduleForStudent,
  getScheduleForLecturer,
};
