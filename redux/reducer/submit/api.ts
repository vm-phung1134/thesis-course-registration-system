import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { ISubmitObject, ISubmitObjectInput } from "@/interface/submit";
import { IExerciseObject } from "@/interface/exercise";
import { IAuthObject } from "@/interface/auth";

const apiURL = `https://qthuy2k1.shop/api/submit`;

// GET ALL SUBMITS
const getAllSubmits = createAsyncThunk(
  "submit/getAllSubmit",
  async (postData: IExerciseObject) => {
    const response = await axios.get(`${apiURL}/ex/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.submissions;
    }
    throw new Error("Failed to get all submit");
  }
);

// GET ONE SUBMIT
const getSubmit = createAsyncThunk(
  "submit/getSubmit",
  async (submitData: any) => {
    const response = await axios.get(
      `http://qthuy2k1.shop/api/exercise/${submitData.exerciseID}/submit/${submitData.studentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.submissions;
    }
    throw new Error("Failed to get one submit");
  }
);

// CREATE SUBMIT
const createSubmit = createAsyncThunk(
  "submit/createSubmit",
  async (submitData: ISubmitObjectInput) => {
    const formData = new FormData();
    formData.append("status", submitData.status);
    formData.append("authorID", submitData.authorID);
    formData.append("exerciseID", submitData.exerciseID);
    if (submitData.attachments) {
      for (let i = 0; i < submitData.attachments.length; i++) {
        formData.append("attachments", submitData.attachments[i]);
      }
    }

    const response = await axios.post(
      `http://qthuy2k1.shop/upload/submit`,
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

    throw new Error("Failed to create submit");
  }
);

// UPDATE SUBMIT
const updateSubmit = createAsyncThunk(
  "submit/updateSubmit",
  async (submitData: ISubmitObject) => {
    const response = await axios.put(`${apiURL}/${submitData.id}`, submitData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update submit");
  }
);

// GET ALL SUBMITS OF STUDENT
const getAllSubmitStud = createAsyncThunk(
  "submit/getAllSubmitStud",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `http://qthuy2k1.shop/api/auth/${postData.id}/submit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.submissions;
    }
    throw new Error("Failed to get all submit of student");
  }
);

// DELETE SUBMIT
const deleteSubmit = createAsyncThunk(
  "submit/deleteSubmit",
  async (submitData: ISubmitObject) => {
    const response = await axios.delete(`${apiURL}/${submitData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete submit");
  }
);

export {
  getAllSubmits,
  getSubmit,
  createSubmit,
  updateSubmit,
  deleteSubmit,
  getAllSubmitStud,
};
