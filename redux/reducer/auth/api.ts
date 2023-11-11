import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";

// GET ONE AUTH
const getOneAuth = createAsyncThunk(
  "auth/getOneAuth",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/${postData.id}`,
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

// GET ALL AUTHS
const getAllAuths = createAsyncThunk("authors/getAllAuths", async () => {
  const response = await axios.get(`http://localhost:5000/api/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all auths");
});

// GET ALL LECTURERS
const getAllLecturers = createAsyncThunk(
  "authors/getAllLecturers",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/lecturer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all lecturers");
  }
);

// LOGIN AUTH INTO APP
const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (postData: IAuthObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth",
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
    throw new Error("Failed to login auth");
  }
);

// UPDATE INFORMATIION
const updateAuth = createAsyncThunk(
  "auth/updateAuth",
  async (postData: IAuthObject) => {
    const response = await axios.put(
      `http://localhost:5000/api/auth/${postData.id}`,
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
    throw new Error("Failed to update auth");
  }
);

// CHECK STATE SUBSCRIBE
const checkStateSubscribe = createAsyncThunk(
  "auth/checkStateSubscribe",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/check-subscribe/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to check state subcribe");
  }
);

// CHECK STATE CLASSROOM PAGE
const checkAuthRoleForClassroomState = createAsyncThunk(
  "auth/checkAuthRoleForClassroomState",
  async (postData: IAuthObject) => {
    const response = await axios.post(
      `http://localhost:5000/api/auth/check-authorClassroomState`,
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
    throw new Error("Failed to check state classroom");
  }
);

// UNSUBSCRIBE STATE
const unsubscribeState = createAsyncThunk(
  "auth/unsubscribeState",
  async (postData: IAuthObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/auth/un-subscribe/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to check state subcribe");
  }
);

const deleteAuth = createAsyncThunk(
  "auth/deleteAuth",
  async (postData: IAuthObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/auth/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete auth");
  }
);

export {
  getAllAuths,
  unsubscribeState,
  getOneAuth,
  loginAuth,
  updateAuth,
  getAllLecturers,
  checkStateSubscribe,
  checkAuthRoleForClassroomState,
  deleteAuth
};
