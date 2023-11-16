import { createSlice } from "@reduxjs/toolkit";
import { INITIATE_PRIVATE_COMMENT } from "@/data";
import { PrivateCommentState } from "./type";
import {
  createPrivateComment,
  getAllPrivateCommentForLecturer,
  getAllPrivateComments,
} from "./api";

const initialState: PrivateCommentState = {
  priComments: [],
  priComment: INITIATE_PRIVATE_COMMENT,
  isLoading: false,
  error: null,
};

const privateCommentSlice = createSlice({
  name: "private-comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL COMMENTS
    builder.addCase(getAllPrivateComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPrivateComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.priComment = action.payload;
    });
    builder.addCase(getAllPrivateComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL COMMENTS LECTURER
    builder.addCase(getAllPrivateCommentForLecturer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAllPrivateCommentForLecturer.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.priComments = action.payload;
      }
    );
    builder.addCase(
      getAllPrivateCommentForLecturer.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong.";
      }
    );

    // CREATE COMMENT
    builder.addCase(createPrivateComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPrivateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.priComment = action.payload;
    });
    builder.addCase(createPrivateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default privateCommentSlice.reducer;
