import { createSlice } from "@reduxjs/toolkit";
import { MemberState } from "./type";
import {
  createMember,
  deleteMember,
  getAllMemberClassroom,
  getAllMembers,
  getMember,
} from "./api";
import { INITIATE_MEMBER } from "@/data";

const initialState: MemberState = {
  members: [],
  member: INITIATE_MEMBER,
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
    // CREATE NEW MEMBERS
    builder.addCase(createMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.member = action.payload;
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // GET ONE MEMBER
    builder.addCase(getMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.member = action.payload;
    });
    builder.addCase(getMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // DELETE MEMBER
    builder.addCase(deleteMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.member = action.payload;
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
    // GET ALL MEMBER IN CLASSROOM
    builder.addCase(getAllMemberClassroom.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllMemberClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    });
    builder.addCase(getAllMemberClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default memberSlice.reducer;
