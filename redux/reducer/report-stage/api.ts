import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";

const apiURL = `http://qthuy2k1.shop/api/report-stage`;

// GET ALL REPORT STAGES
const getAllReportStage = createAsyncThunk(
  "report-stage/getAllReportStage",
  async () => {
    const response = await axios.get(`${apiURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.categorys;
    }
    throw new Error("Failed to get all report stage");
  }
);

// GET ONE REPORT STAGE
const getReportStage = createAsyncThunk(
  "report-stage/getReportStage",
  async (id: string) => {
    const response = await axios.get(
      `${apiURL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.category;
    }
    throw new Error("Failed to get one report stage");
  }
);

export { getAllReportStage, getReportStage };
