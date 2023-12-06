import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IPrivateComment } from "@/interface/privateComment";
import { IAuthObject } from "@/interface/auth";

const apiURL =
  "https://thesis-course-registration-system-backend-vm-phung1134.vercel.app/api/private-comment";

// GET ALL COMMENTS
const getAllPrivateComments = createAsyncThunk(
  "private-comment/getAllPrivateComments",
  async (postData: IAuthObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all private-comments");
  }
);

// GET ALL COMMENTS LECTURER
const getAllPrivateCommentForLecturer = createAsyncThunk(
  "private-comment/getAllPrivateCommentForLecturer",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/lecturer-message/${postData.id}`,
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
  async (postData: IPrivateComment) => {
    console.log(postData);
    const response = await axios.post(`${apiURL}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create private-comment");
  }
);

export {
  getAllPrivateComments,
  createPrivateComment,
  getAllPrivateCommentForLecturer,
};
