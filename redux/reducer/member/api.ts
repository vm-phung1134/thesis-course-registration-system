import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";

// GET ALL MEMBERS
const getAllMembers = createAsyncThunk("member/getAllMembers", async () => {
  const response = await axios.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all members");
});

// ADD NEW MEMBER



export { getAllMembers };
