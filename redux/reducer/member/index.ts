import { createSlice } from "@reduxjs/toolkit";
import { MemberState } from "./type";
import { getAllMembers } from "./api";

const initialState: MemberState = {
  members: [],
  isLoading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL MEMBERS
    builder.addCase(getAllMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    });
    builder.addCase(getAllMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default memberSlice.reducer;
