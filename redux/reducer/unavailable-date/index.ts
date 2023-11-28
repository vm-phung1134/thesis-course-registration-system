import { createSlice } from "@reduxjs/toolkit";
import { UnavailableDateState } from "./type";
import { createUnavaiableDate, getAllUnavaiableDates } from "./api";
import { INITIATE_UNAVAIABLE_SCHEDULE } from "@/data";

const initialState: UnavailableDateState = {
  unavailableDates: [],
  unavailableDate: INITIATE_UNAVAIABLE_SCHEDULE,
  isLoading: false,
  error: null,
};

const unavaiableDateSlice = createSlice({
  name: "unavailale-date",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL COMMENTS
    builder.addCase(getAllUnavaiableDates.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUnavaiableDates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.unavailableDates = action.payload;
    });
    builder.addCase(getAllUnavaiableDates.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE COMMENT
    builder.addCase(createUnavaiableDate.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUnavaiableDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.unavailableDate = action.payload;
    });
    builder.addCase(createUnavaiableDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default unavaiableDateSlice.reducer;