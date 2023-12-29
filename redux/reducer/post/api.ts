import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject } from "@/interface/post";
import { IClassroomObject } from "@/interface/classroom";
import { apiURL } from "@/data";

// GET ALL POSTS
const getAllPosts = createAsyncThunk("post/getAllPost", async () => {
  const response = await axios.get(`${apiURL}/post`, {
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
const getPost = createAsyncThunk("post/getPost", async (post: IPostObject) => {
  const response = await axios.get(`${apiURL}/post/${post.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get one post");
});

// GET ALL POST FOLLOW CLASS
const getAllPostInClass = createAsyncThunk(
  "post/getAllPostInClass",
  async (classroom: IClassroomObject | null) => {
    const response = await axios.get(`${apiURL}/post/class/${classroom?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all posts");
  }
);

// GET ALL POST FOLLOW REPORT STAGE
const getAllPostInReportStage = createAsyncThunk(
  "post/getAllPostInReportStage",
  async (post: any) => {
    const response = await axios.get(
      `${apiURL}/post/stage/${post.classroomId}&${post.categoryId}`,
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
  async (post: IPostObject) => {
    const formData = new FormData();
    formData.append("uid", post.uid);
    formData.append("title", post.title);
    formData.append("category", JSON.stringify(post.category));
    formData.append("classroom", JSON.stringify(post.classroom));
    formData.append("lecturer", JSON.stringify(post.lecturer));
    formData.append("description", post.description);
    formData.append("type", post.type);
    if (post.attachments) {
      for (let i = 0; i < post.attachments.length; i++) {
        formData.append("attachment", post.attachments[i]);
      }
    }

    const response = await axios.post(`${apiURL}/post/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to create post");
  }
);

// UPDATE POST
const updatePost = createAsyncThunk(
  "post/updatePost",
  async (post: IPostObject) => {
    const response = await axios.put(`${apiURL}/post/${post.id}`, post, {
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
  async (post: IPostObject) => {
    const response = await axios.delete(`${apiURL}/post/${post.id}`, {
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
  getAllPostInClass,
  createPost,
  updatePost,
  deletePost,
};
