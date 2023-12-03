import { INITIATE_UPLOAD_REPORT } from "../../../data/index";
import { createSlice } from "@reduxjs/toolkit";
import { UploadReportState } from "./type";
import {
  createUploadReport,
  deleteUploadReport,
  getAllUploadReports,
  getUploadReport,
} from "./api";

const initialState: UploadReportState = {
  uploads: [],
  upload: INITIATE_UPLOAD_REPORT,
  isLoading: false,
  error: null,
};

const uploadReportSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE EXERCISE
    builder.addCase(getUploadReport.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUploadReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.upload = action.payload;
    });
    builder.addCase(getUploadReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL EXERCISE
    builder.addCase(getAllUploadReports.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUploadReports.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uploads = action.payload;
    });
    builder.addCase(getAllUploadReports.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE EXERCISE
    builder.addCase(createUploadReport.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUploadReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.upload = action.payload;
    });
    builder.addCase(createUploadReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // DELETE EXERCISE
    builder.addCase(deleteUploadReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUploadReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.upload = action.payload;
    });
    builder.addCase(deleteUploadReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default uploadReportSlice.reducer;
