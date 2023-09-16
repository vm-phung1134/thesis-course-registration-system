import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";

// GET ONE AUTH
const getAuth = createAsyncThunk("auth/getAuth", async (authId: string) => {
  const response = await axios.get(``, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get one auth");
});

// GET ALL AUTHS
const getAllAuths = createAsyncThunk("authors/getAllAuths", async () => {
  const response = await axios.get(``, {
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
    const response = await axios.post("", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to login auth");
  }
);

// UPDATE INFORMATIION
const updateAuth = createAsyncThunk(
  "auth/updateAuth",
  async (auth: IAuthObject) => {
    const response = await axios.put(``, auth, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update auth");
  }
);

export { getAllAuths, getAuth, loginAuth, updateAuth };
