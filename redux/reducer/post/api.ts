import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject } from "@/interface/post";

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
      `http://localhost:5000/api/post/${postData.classroom.id}&${postData.uid}`,
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
    if (postData.attachment) {
      for (let i = 0; i < postData.attachment.length; i++) {
        formData.append("attachment", postData.attachment[i]);
      }
    }

    const response = await axios.post(
      "http://localhost:5000/api/post/",
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

export { getAllPosts, getPost, createPost, updatePost, deletePost };
