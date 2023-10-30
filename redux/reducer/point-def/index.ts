import { createSlice } from "@reduxjs/toolkit";
import { INITIATE_POINT_DEF } from "@/data";
import { PointDefState } from "./type";
import {
  createPointDef,
  deletePointDef,
  getAllPointDefs,
  getOnePointDef,
  updatePointDef,
} from "./api";

const initialState: PointDefState = {
  points: [],
  point: INITIATE_POINT_DEF,
  isLoading: false,
  error: null,
};

const pointDefSlice = createSlice({
  name: "pointDef",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(getOnePointDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOnePointDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.point = action.payload;
    });
    builder.addCase(getOnePointDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(getAllPointDefs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPointDefs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.points = action.payload;
    });
    builder.addCase(getAllPointDefs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE STUDENT DEF
    builder.addCase(createPointDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPointDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.point = action.payload;
    });
    builder.addCase(createPointDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE STUDENT DEF
    builder.addCase(updatePointDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePointDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.point = action.payload;
    });
    builder.addCase(updatePointDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE STUDENT DEF
    builder.addCase(deletePointDef.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePointDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.point = action.payload;
    });
    builder.addCase(deletePointDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default pointDefSlice.reducer;
