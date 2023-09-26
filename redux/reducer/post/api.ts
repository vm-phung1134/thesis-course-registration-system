import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject } from "@/interface/post";
import { IClassroomObject } from "@/interface/classroom";

// GET ALL POSTS
const getAllPosts = createAsyncThunk("post/getAllPost", async () => {
  const response = await axios.get(`http://localhost:5000/api/post`, {
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
  async (postData: IPostObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/post/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one post");
  }
);

// GET ALL POST FOLLOW CLASS
const getAllPostInClass = createAsyncThunk(
  "post/getAllPostInClass",
  async (postData: IClassroomObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/post/class/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all posts");
  }
);

// GET ALL POST FOLLOW REPORT STAGE
const getAllPostInReportStage = createAsyncThunk(
  "post/getAllPostInReportStage",
  async (postData: IPostObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/post/${postData.classroom.id}&${postData.category.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all posts");
  }
);

// CREATE POST
const createPost = createAsyncThunk(
  "post/createPost",
  async (postData: IPostObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/post/",
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to create post");
  }
);

// UPDATE POST
const updatePost = createAsyncThunk(
  "post/updatePost",
  async (postData: IPostObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/post/${postData.id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update post");
  }
);

// DELETE POST
const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postData: IPostObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/post/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete post");
  }
);

export {
  getAllPosts,
  getPost,
  getAllPostInReportStage,
  getAllPostInClass,
  createPost,
  updatePost,
  deletePost,
};
