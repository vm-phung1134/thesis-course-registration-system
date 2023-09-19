import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IExerciseObject } from "@/interface/exercise";

// GET ALL POSTS
const getAllPosts = createAsyncThunk("post/getAllPost", async () => {
  const response = await axios.get(``, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all post");
});

// GET ONE POST
const getPost = createAsyncThunk(
  "post/getPost",
  async (postData: IExerciseObject) => {
    const response = await axios.get(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one post");
  }
);

// CREATE EXERCISE
const createPost = createAsyncThunk(
  "post/createPost",
  async (postData: IExerciseObject) => {
    const response = await axios.post(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create post");
  }
);

// UPDATE EXERCISE
const updatePost = createAsyncThunk(
  "post/updatePost",
  async (postData: IExerciseObject) => {
    const response = await axios.put(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update post");
  }
);

// DELETE POST
const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postData: IExerciseObject) => {
    const response = await axios.delete(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete post");
  }
);

export { getAllPosts, getPost, createPost, updatePost, deletePost };
