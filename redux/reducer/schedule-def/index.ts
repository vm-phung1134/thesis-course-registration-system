import { createSlice } from "@reduxjs/toolkit";
import { ScheduledDefState } from "./type";
import { createScheduleDef, getOneCouncilInSchedule, getScheduleDef } from "./api";

const initialState: ScheduledDefState = {
  thesis: {
    thesis: [],
  },
  council: {},
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE ONE SCHEDULE
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

    // GET SCHEDULE
    builder.addCase(getScheduleDef.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getScheduleDef.fulfilled, (state, action) => {
      state.isLoading = false;
      state.thesis = action.payload;
    });
    builder.addCase(getScheduleDef.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET COUNCIL IN SCHEDULE
    builder.addCase(getOneCouncilInSchedule.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOneCouncilInSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(getOneCouncilInSchedule.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
