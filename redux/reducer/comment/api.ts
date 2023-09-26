import { ICommentObject } from "@/interface/comment";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPostObject } from "@/interface/post";
import { IExerciseObject } from "@/interface/exercise";

// GET ALL COMMENTS
const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async (postData: IPostObject | IExerciseObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/comment/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all comments");
  }
);

const createComment = createAsyncThunk(
  "comment/createComment",
  async (postData: ICommentObject) => {
    const response = await axios.post(
      `http://localhost:5000/api/comment/`,
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
    throw new Error("Failed to create comment");
  }
);

export { getAllComments, createComment };
