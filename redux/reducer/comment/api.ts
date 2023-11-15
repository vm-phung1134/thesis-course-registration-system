import { ICommentObject } from "@/interface/comment";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";

const apiURL = `http://qthuy2k1.shop/api/comment`;

// GET ALL COMMENTS
const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async (id: string) => {
    const response = await axios.get(
      `${apiURL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.comment;
    }
    throw new Error("Failed to get all comments");
  }
);

const createComment = createAsyncThunk(
  "comment/createComment",
  async (postData: ICommentObject) => {
    const response = await axios.post(
      `${apiURL}`,
      {"comment": postData},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create comment");
  }
);

export { getAllComments, createComment };
