import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";

const apiURL = `http://qthuy2k1.shop/api/auth`;

// GET ONE AUTH
const getOneAuth = createAsyncThunk(
  "auth/getOneAuth",
  async (postData: IAuthObject) => {
    const response = await axios.get(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.user;
    }
    throw new Error("Failed to get one auth");
  }
);

// GET ALL AUTHS
const getAllAuths = createAsyncThunk("authors/getAllAuths", async () => {
  const response = await axios.get(`${apiURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data.users;
  }
  throw new Error("Failed to get all auths");
});

// GET ALL LECTURERS
const getAllLecturers = createAsyncThunk(
  "authors/getAllLecturers",
  async () => {
    const response = await axios.get(`${apiURL}/lecturer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.lecturers;
    }
    throw new Error("Failed to get all lecturers");
  }
);

// LOGIN AUTH INTO APP
const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (postData: IAuthObject) => {
    const response = await axios.post(
      `${apiURL}`,
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
      `${apiURL}/${postData.id}`,
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

// CHECK STATE SUBSCRIBE
const checkStateSubscribe = createAsyncThunk(
  "auth/checkStateSubscribe",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/check-subscribe/${postData.id}`,
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
// UNSUBSCRIBE STATE
const unsubscribeState = createAsyncThunk(
  "auth/unsubscribeState",
  async (postData: IAuthObject) => {
    const response = await axios.delete(
      `${apiURL}/un-subscribe/${postData.id}`,
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
    const response = await axios.delete(`${apiURL}/${postData.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  deleteAuth,
};
