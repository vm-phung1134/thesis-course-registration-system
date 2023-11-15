import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject } from "@/interface/post";
import { IClassroomObject } from "@/interface/classroom";

const apiURL = `http://qthuy2k1.shop/api/post`;

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

// GET ALL POST FOLLOW CLASS
const getAllPostInClass = createAsyncThunk(
  "post/getAllPostInClass",
  async (postData: IClassroomObject | null) => {
    const response = await axios.get(`${apiURL}/class/${postData?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.postInClass;
    }
    throw new Error("Failed to get all posts");
  }
);

// GET ALL POST FOLLOW REPORT STAGE
const getAllPostInReportStage = createAsyncThunk(
  "post/getAllPostInReportStage",
  async (postData: any) => {
    const response = await axios.get(
      `${apiURL}/stage/${postData.classroomId}&${postData.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.postInStage;
    }
    throw new Error("Failed to get all posts");
  }
);

// CREATE POST
const createPost = createAsyncThunk(
  "post/createPost",
  async (postData: IPostObject) => {
    const formData = new FormData();
    formData.append("uid", postData.uid);
    formData.append("title", postData.title);
    formData.append("category", JSON.stringify(postData.category));
    formData.append("classroom", JSON.stringify(postData.classroom));
    formData.append("lecturer", JSON.stringify(postData.lecturer));
    formData.append("description", postData.description);
    formData.append("type", postData.type);
    if (postData.attachments) {
      for (let i = 0; i < postData.attachments.length; i++) {
        formData.append("attachment", postData.attachments[i]);
      }
    }

    const response = await axios.post(`${apiURL}`, formData, {
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
  async (postData: IPostObject) => {
    const response = await axios.put(`${apiURL}/${postData.id}`, {"post": postData}, {
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
  getAllPostInClass,
  createPost,
  updatePost,
  deletePost,
};
