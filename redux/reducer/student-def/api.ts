import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StudentDefLimit, token } from "./type";
import { IStudentDefObject } from "@/interface/studef";

const apiURL =
  "https://thesis-course-registration-system-backend-vm-phung1134.vercel.app/api/student-def";

// GET ONE STUDENT DEF
const getOneStudentDef = createAsyncThunk(
  "studef/getOneStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get one auth");
  }
);

// GET ALL STUDENT DEFS
const getAllStudentDefs = createAsyncThunk(
  "studef/getAllStudentDefs",
  async () => {
    const response = await axios.get(`${apiURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all auths");
  }
);

// GET ALL STUDENT DEFS PAGINATION
const getAllStudentDefPag = createAsyncThunk(
  "studef/getAllStudentDefPag",
  async (params: StudentDefLimit) => {
    const response = await axios.get(
      `${apiURL}/list-studef/id=${params.uid}?page=${params.page}&limit=${params.limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all auths");
  }
);

// CREATE STUDENT DEF
const createStudentDef = createAsyncThunk(
  "studef/createStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.post(`${apiURL}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create student-def");
  }
);

// UPDATE STUDENT DEF
const updateStudentDef = createAsyncThunk(
  "studef/updateStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.put(`${apiURL}/${postData.id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update student-def");
  }
);

// DELETE STUDENT DEF
const deleteStudentDef = createAsyncThunk(
  "studef/deleteStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete student defense");
  }
);

// DELETE ALL STUDENT DEF
const deleteAllStudentDef = createAsyncThunk(
  "studef/deleteAllStudentDef",
  async () => {
    const response = await axios.delete(`${apiURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete student defense");
  }
);

export {
  getAllStudentDefs,
  getOneStudentDef,
  updateStudentDef,
  createStudentDef,
  deleteStudentDef,
  deleteAllStudentDef,
  getAllStudentDefPag,
};
