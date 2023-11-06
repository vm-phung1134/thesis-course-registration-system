import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { ICategoryObject } from "@/interface/category";

// GET ALL REPORT STAGES
const getAllReportStage = createAsyncThunk(
  "report-stage/getAllReportStage",
  async () => {
    const response = await axios.get("http://localhost:5000/api/report-stage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all report stage");
  }
);

// GET ONE REPORT STAGE
const getReportStage = createAsyncThunk(
  "report-stage/getReportStage",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:5000/api/report-stage/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one report stage");
  }
);

export { getAllReportStage, getReportStage };
