import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IStudentDefObject } from "@/interface/studef";

// GET ONE STUDENT DEF
const getOneStudentDef = createAsyncThunk(
  "studef/getOneStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/student-def/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await axios.get(`http://localhost:5000/api/student-def`, {
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

// CREATE STUDENT DEF
const createStudentDef = createAsyncThunk(
  "studef/createStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/student-def",
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
    throw new Error("Failed to create student-def");
  }
);

// UPDATE STUDENT DEF
const updateStudentDef = createAsyncThunk(
  "studef/updateStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/student-def/${postData.id}`,
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
    throw new Error("Failed to update student-def");
  }
);

// DELETE STUDENT DEF
const deleteStudentDef = createAsyncThunk(
  "studef/deleteStudentDef",
  async (postData: IStudentDefObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/student-def/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
};
