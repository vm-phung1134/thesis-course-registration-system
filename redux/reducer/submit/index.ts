import { INITIATE_SUBMIT } from "@/data";
import { createSlice } from "@reduxjs/toolkit";
import { SubmitState } from "./type";
import {
  createSubmit,
  deleteSubmit,
  getAllSubmits,
  getSubmit,
  updateSubmit,
} from "./api";

const initialState: SubmitState = {
  submits: [],
  submit: INITIATE_SUBMIT,
  isLoading: false,
  error: null,
};

const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE SUBMIT
    builder.addCase(getSubmit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submit = action.payload;
    });
    builder.addCase(getSubmit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL SUBMIT
    builder.addCase(getAllSubmits.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllSubmits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submits = action.payload;
    });
    builder.addCase(getAllSubmits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE SUBMIT 
    builder.addCase(createSubmit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submit = action.payload;
    });
    builder.addCase(createSubmit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE SUBMIT 
    builder.addCase(updateSubmit.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submit = action.payload;
    });
    builder.addCase(updateSubmit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE SUBMIT 
    builder.addCase(deleteSubmit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.submit = action.payload;
    });
    builder.addCase(deleteSubmit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default submitSlice.reducer;
