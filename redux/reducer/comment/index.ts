import { createSlice } from "@reduxjs/toolkit";
import { createComment, getAllComments } from "./api";
import { CommentState } from "./type";
import { INITIATE_COMMENT } from "@/data";

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
    // GET ALL COMMENTS
    builder.addCase(getAllComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(getAllComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

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
