
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPrivateComment } from "@/interface/privateComment";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ALL COMMENTS
const getAllPrivateComments = createAsyncThunk(
  "private-comment/getAllPrivateComments",
  async (pComment: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/private-comment/${pComment.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all private-comments");
  }
);

// GET ALL COMMENTS LECTURER
const getAllPrivateCommentForLecturer = createAsyncThunk(
  "private-comment/getAllPrivateCommentForLecturer",
  async (pComment: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/private-comment/lecturer-message/${pComment.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all private-comments");
  }
);

const createPrivateComment = createAsyncThunk(
  "private-comment/createPrivateComment",
  async (pComment: IPrivateComment) => {
    const response = await axios.post(
      `${apiURL}/private-comment/`,
      pComment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create private-comment");
  }
);

export { getAllPrivateComments, createPrivateComment, getAllPrivateCommentForLecturer };
