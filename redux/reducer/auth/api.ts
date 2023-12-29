import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "./type";
import { IAuthObject } from "@/interface/auth";
import { apiURL } from "@/data";

// GET USER DETAIL INFORMATION
const getOneAuth = createAsyncThunk(
  "auth/getOneAuth",
  async (user: IAuthObject) => {
    const response = await axios.get(`${apiURL}/auth/${user.id}`, {
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

// GET ALL LIST USER IN SYTEM
const getAllAuths = createAsyncThunk("authors/getAllAuths", async () => {
  const response = await axios.get(`${apiURL}/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all auths");
});

// GET ALL LIST USER AS LECTURES
const getAllLecturers = createAsyncThunk(
  "authors/getAllLecturers",
  async () => {
    const response = await axios.get(`${apiURL}/auth/lecturer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all lecturers");
  }
);

// CHECK STATE USER AGAIN BEFORE VERIFIED
const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (postData: IAuthObject) => {
    const response = await axios.post(`${apiURL}/auth`, postData, {
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

// UPDATE SYNC USER DETAIL INFORMATION
const updateAuth = createAsyncThunk(
  "auth/updateAuth",
  async (user: IAuthObject) => {
    const response = await axios.put(`${apiURL}/auth/${user.id}`, user, {
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

// CHECK STATE SUBSCRIBE CLASSROOM OF STUDENT
const checkStateSubscribe = createAsyncThunk(
  "auth/checkStateSubscribe",
  async (user: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/auth/check-subscribe/${user.id}`,
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

// IMPLEMENT UNSUBCRIBE STATE OF STUDENT
const unsubscribeState = createAsyncThunk(
  "auth/unsubscribeState",
  async (user: IAuthObject) => {
    const response = await axios.delete(
      `${apiURL}/auth/un-subscribe/${user.id}`,
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
    const response = await axios.delete(`${apiURL}/auth/${postData.id}`, {
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
