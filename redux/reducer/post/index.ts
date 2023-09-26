import { INITIATE_POST } from "@/data";
import { createSlice } from "@reduxjs/toolkit";
import { PostState } from "./type";
import {
  createPost,
  deletePost,
  getAllPostInClass,
  getAllPostInReportStage,
  getAllPosts,
  getPost,
  updatePost,
} from "./api";

const initialState: PostState = {
  posts: [],
  post: INITIATE_POST,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE POST
    builder.addCase(getPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL POST
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL POST IN CLASS
    builder.addCase(getAllPostInClass.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPostInClass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPostInClass.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // GET ALL POST IN REPORT STAGE
    builder.addCase(getAllPostInReportStage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPostInReportStage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPostInReportStage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // CREATE POST
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // UPDATE POST
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });

    // DELETE POST
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Something went wrong.";
    });
  },
});

export default postSlice.reducer;
