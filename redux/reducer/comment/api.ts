import { ICommentObject } from "@/interface/comment";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";

// GET ALL COMMENTS
const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async (postData) => {
    const response = await axios.get(``, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all comments");
  }
);

const createComment = createAsyncThunk(
  "comment/createComment",
  async (postData: ICommentObject) => {
    const response = await axios.post(``, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create comment");
  }
);

export { getAllComments, createComment };
