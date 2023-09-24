import { createSlice } from "@reduxjs/toolkit";
import { INITIATE_CATEGORY } from "@/data";
import { ReportStageState } from "./type";
import { getAllReportStage, getReportStage } from "./api";

const initialState: ReportStageState = {
  reportStages: [],
  reportStage: INITIATE_CATEGORY,
  isLoading: false,
  error: null,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE REPORT STAGE
    builder.addCase(getReportStage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getReportStage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reportStage = action.payload;
    });
    builder.addCase(getReportStage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL REPORT STAGES
    builder.addCase(getAllReportStage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllReportStage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reportStages = action.payload;
    });
    builder.addCase(getAllReportStage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default classroomSlice.reducer;
