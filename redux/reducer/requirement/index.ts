import { createSlice } from "@reduxjs/toolkit";
import { RequirementState } from "./type";
import {
  createRequirement,
  deleteRequirement,
  getAllRequirementClassroom,
  getAllRequirements,
} from "./api";
import { INITIATE_MEMBER } from "@/data";

const initialState: RequirementState = {
  requirements: [],
  isLoading: false,
  requirement: INITIATE_MEMBER,
  error: null,
};

const requirementSlice = createSlice({
  name: "requirement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL REQUIREMENTS
    builder.addCase(getAllRequirements.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllRequirements.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requirements = action.payload;
    });
    builder.addCase(getAllRequirements.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // GET ALL REQUIREMENT IN CLASS
    builder.addCase(getAllRequirementClassroom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllRequirementClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requirements = action.payload;
    });
    builder.addCase(getAllRequirementClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // CREATE NEW REQUIREMENT
    builder.addCase(createRequirement.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createRequirement.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requirement = action.payload;
    });
    builder.addCase(createRequirement.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? "Something went wrong.";
    });
    // DELETE REQUIREMENT
    builder.addCase(deleteRequirement.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteRequirement.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requirement = action.payload;
    });
    builder.addCase(deleteRequirement.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default requirementSlice.reducer;
