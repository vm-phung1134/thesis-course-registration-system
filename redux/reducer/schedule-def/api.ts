import { IThesisDef } from "@/interface/schedule";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";

const createScheduleDef = createAsyncThunk(
  "schedule/createScheduleDef",
  async () => {
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
  }
);

const saveScheduleDef = createAsyncThunk(
  "schedule/saveScheduleDef",
  async (postData: IThesisDef) => {
    const response = await axios.post(
      "http://localhost:5000/api/schedule-report",
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
    throw new Error("Failed to save schedule to database");
  }
);

export { createScheduleDef, saveScheduleDef };
