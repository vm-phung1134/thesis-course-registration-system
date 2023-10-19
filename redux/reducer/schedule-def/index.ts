import { createSlice } from "@reduxjs/toolkit";
import { ScheduledDefState } from "./type";
import {
  createScheduleDef,
  getOneCouncilInScheduleLecturer,
  getOneCouncilInScheduleStudent,
  getScheduleDef,
  getScheduleForLecturer,
  getScheduleForStudent,
} from "./api";

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
    builder.addCase(getOneCouncilInScheduleStudent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getOneCouncilInScheduleStudent.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.council = action.payload;
      }
    );
    builder.addCase(
      getOneCouncilInScheduleStudent.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong.";
      }
    );

    // GET COUNCIL IN SCHEDULE
    builder.addCase(getOneCouncilInScheduleLecturer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getOneCouncilInScheduleLecturer.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.council = action.payload;
      }
    );
    builder.addCase(
      getOneCouncilInScheduleLecturer.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong.";
      }
    );

    // GET SCHEDULE FOR STUDENT
    builder.addCase(getScheduleForStudent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getScheduleForStudent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(getScheduleForStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET SCHEDULE FOR LECTURER
    builder.addCase(getScheduleForLecturer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getScheduleForLecturer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.council = action.payload;
    });
    builder.addCase(getScheduleForLecturer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default authSlice.reducer;
