import { createSlice } from "@reduxjs/toolkit";
import { CommentState } from "./type";
import { INITIATE_COMMENT } from "@/data";
import { createComment } from "./api";

const initialState: CommentState = {
  comments: [],
  comment: INITIATE_COMMENT,
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE COMMENT
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default commentSlice.reducer;
