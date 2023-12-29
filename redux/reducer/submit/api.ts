import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { ISubmitObject } from "@/interface/submit";
import { IExerciseObject } from "@/interface/exercise";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET ALL SUBMITS
const getAllSubmits = createAsyncThunk(
  "submit/getAllSubmit",
  async (exercise: IExerciseObject) => {
    const response = await axios.get(`${apiURL}/submit/ex/${exercise.uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all submit");
  }
);

// GET ONE SUBMIT
const getSubmit = createAsyncThunk(
  "submit/getSubmit",
  async (submitData: any) => {
    const response = await axios.get(
      `${apiURL}/submit/${submitData.exerciseId}&${submitData.studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one submit");
  }
);

// CREATE SUBMIT
const createSubmit = createAsyncThunk(
  "submit/createSubmit",
  async (submitData: ISubmitObject) => {
    const formData = new FormData();
    formData.append("status", submitData.status);
    formData.append("student", JSON.stringify(submitData.student));
    formData.append("exerciseId", submitData.exerciseId);
    formData.append("uid", submitData.uid);
    if (submitData.attachments) {
      for (let i = 0; i < submitData.attachments.length; i++) {
        formData.append("attachment", submitData.attachments[i]);
      }
    }
    const response = await axios.post(`${apiURL}/submit/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
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
    const response = await axios.put(
      `${apiURL}/submit/${submitData.id}`,
      submitData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      `${apiURL}/submit/student/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all submit of student");
  }
);

// DELETE SUBMIT
const deleteSubmit = createAsyncThunk(
  "submit/deleteSubmit",
  async (submitData: ISubmitObject) => {
    const response = await axios.delete(`${apiURL}/submit/${submitData.id}`, {
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
