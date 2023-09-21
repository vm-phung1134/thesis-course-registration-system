import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, user } from "./type";
import { IAuthObject } from "@/interface/auth";

// GET ONE AUTH
const getAuth = createAsyncThunk("auth/getAuth", async () => {
  const response = await axios.get(
    `http://localhost:8081/api/user/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status === 200) {
    return response.data.user;
  }
  throw new Error("Failed to get one auth");
});

// GET ALL AUTHS
const getAllAuths = createAsyncThunk("authors/getAllAuths", async () => {
  const response = await axios.get(`http://localhost:8081/api/user`, {
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
      "http://localhost:8081/api/user",
      { user: postData },
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
      ``,
      { user: postData },
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

export { getAllAuths, getAuth, loginAuth, updateAuth };
