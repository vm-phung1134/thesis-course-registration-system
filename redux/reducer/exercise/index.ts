import { INITIATE_EXERCISE } from "@/data";
import { createSlice } from "@reduxjs/toolkit";
import { ExerciseState } from "./type";
import {
  createExercise,
  deleteExercise,
  getAllExerciseInReportStage,
  getAllExercises,
  getExercise,
  updateExercise,
} from "./api";

const initialState: ExerciseState = {
  exercises: [],
  exercise: INITIATE_EXERCISE,
  isLoading: false,
  error: null,
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE EXERCISE
    builder.addCase(getExercise.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getExercise.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercise = action.payload;
    });
    builder.addCase(getExercise.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL EXERCISE
    builder.addCase(getAllExercises.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllExercises.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercises = action.payload;
    });
    builder.addCase(getAllExercises.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL EXERCISE IN REPORT STAGE
    builder.addCase(getAllExerciseInReportStage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllExerciseInReportStage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercises = action.payload;
    });
    builder.addCase(getAllExerciseInReportStage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE EXERCISE
    builder.addCase(createExercise.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createExercise.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercise = action.payload;
    });
    builder.addCase(createExercise.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE EXERCISE
    builder.addCase(updateExercise.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateExercise.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercise = action.payload;
    });
    builder.addCase(updateExercise.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE EXERCISE
    builder.addCase(deleteExercise.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExercise.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exercise = action.payload;
    });
    builder.addCase(deleteExercise.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default exerciseSlice.reducer;
