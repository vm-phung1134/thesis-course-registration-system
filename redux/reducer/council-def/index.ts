import { createSlice } from "@reduxjs/toolkit";

import { INITIATE_COUNCIL_DEF, INITIATE_STUDENT_DEF } from "@/data";
import {
  createCouncilDef,
  deleteCouncilDef,
  getAllCouncilDefs,
  getOneCouncilDef,
  updateCouncilDef,
} from "./api";
import { CouncilDefState } from "./type";

const initialState: CouncilDefState = {
  councils: [],
  council: INITIATE_COUNCIL_DEF,
  isLoading: false,
  error: null,
};

const councilSlice = createSlice({
  name: "council",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(getOneCouncilDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOneCouncilDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(getOneCouncilDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(getAllCouncilDefs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllCouncilDefs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.councils = action.payload;
    });
    builder.addCase(getAllCouncilDefs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE STUDENT DEF
    builder.addCase(createCouncilDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCouncilDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(createCouncilDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE STUDENT DEF
    builder.addCase(updateCouncilDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCouncilDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(updateCouncilDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE STUDENT DEF
    builder.addCase(deleteCouncilDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCouncilDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(deleteCouncilDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default councilSlice.reducer;
