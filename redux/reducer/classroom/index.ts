import { createSlice } from "@reduxjs/toolkit";
import { INITIATE_COURSE } from "@/data";
import { createClassroom, getAllClassrooms, getClassroom } from "./api";
import { ClassroomState } from "./type";

const initialState: ClassroomState = {
  classrooms: [],
  classroom: INITIATE_COURSE,
  isLoading: false,
  error: null,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE CLASSROOM
    builder.addCase(getClassroom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classroom = action.payload;
    });
    builder.addCase(getClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL CLASSROOMS
    builder.addCase(getAllClassrooms.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllClassrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classrooms = action.payload;
    });
    builder.addCase(getAllClassrooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE CLASSROOM
    builder.addCase(createClassroom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classroom = action.payload;
    });
    builder.addCase(createClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default classroomSlice.reducer;
