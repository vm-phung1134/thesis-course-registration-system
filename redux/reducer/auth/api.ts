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

export { getAllAuths, getOneAuth, loginAuth, updateAuth, checkStateSubscribe };
