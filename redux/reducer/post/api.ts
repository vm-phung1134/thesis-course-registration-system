import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject, IPostObjectInput } from "@/interface/post";
import { IClassroomObject } from "@/interface/classroom";

const apiURL = `https://qthuy2k1.shop/api/post`;

// GET ALL POSTS
const getAllPosts = createAsyncThunk("post/getAllPost", async () => {
  const response = await axios.get(`${apiURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data.posts;
  }
  throw new Error("Failed to get all post");
});

// GET ONE POST
const getPost = createAsyncThunk(
  "post/getPost",
  async (postData: IPostObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.post;
    }
    throw new Error("Failed to get one post");
  }
);

// GET ALL POST FOLLOW REPORT STAGE
const getAllPostInReportStage = createAsyncThunk(
  "post/getAllPostInReportStage",
  async (postData: { classroomId: string; categoryId: string }) => {
    const response = await axios.get(
      `https://qthuy2k1.shop/api/class/${postData.classroomId}/post/stage/${postData.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.posts;
    }
    throw new Error("Failed to get all posts");
  }
);

// CREATE POST
const createPost = createAsyncThunk(
  "post/createPost",
  async (postData: IPostObjectInput) => {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("categoryID", postData.categoryID);
    formData.append("classroomID", postData.classroomID);
    formData.append("authorID", postData.authorID);
    formData.append("description", postData.description);

    if (postData.attachments) {
      for (let i = 0; i < postData.attachments.length; i++) {
        formData.append("attachments", postData.attachments[i]);
      }
    }

    const response = await axios.post(
      `http://qthuy2k1.shop/upload/post`,
      formData,
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
      `${apiURL}/${postData.id}`,
      { post: postData },
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
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
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

export {
  getAllPosts,
  getPost,
  getAllPostInReportStage,
  createPost,
  updatePost,
  deletePost,
};
