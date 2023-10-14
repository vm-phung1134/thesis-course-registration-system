import { createSlice } from "@reduxjs/toolkit";

import { INITIATE_STUDENT_DEF } from "@/data";
import { StudentDefState } from "./type";
import {
  createStudentDef,
  deleteStudentDef,
  getAllStudentDefs,
  getOneStudentDef,
  updateStudentDef,
} from "./api";

const initialState: StudentDefState = {
  studefs: [],
  studef: INITIATE_STUDENT_DEF,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(getOneStudentDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOneStudentDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studef = action.payload;
    });
    builder.addCase(getOneStudentDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(getAllStudentDefs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllStudentDefs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studefs = action.payload;
    });
    builder.addCase(getAllStudentDefs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE STUDENT DEF
    builder.addCase(createStudentDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createStudentDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studef = action.payload;
    });
    builder.addCase(createStudentDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE STUDENT DEF
    builder.addCase(updateStudentDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStudentDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studef = action.payload;
    });
    builder.addCase(updateStudentDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE STUDENT DEF
    builder.addCase(deleteStudentDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteStudentDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studef = action.payload;
    });
    builder.addCase(deleteStudentDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
