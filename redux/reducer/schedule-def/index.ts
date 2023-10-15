import { createSlice } from "@reduxjs/toolkit";
import { ScheduledDefState } from "./type";
import { createScheduleDef, saveScheduleDef } from "./api";

const initialState: ScheduledDefState = {
  thesis: [],
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE STUDENT DEF
    builder.addCase(createScheduleDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createScheduleDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    });
    builder.addCase(createScheduleDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL STUDENT DEF
    builder.addCase(saveScheduleDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveScheduleDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    });
    builder.addCase(saveScheduleDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
