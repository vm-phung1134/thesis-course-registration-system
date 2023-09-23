import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject } from "@/interface/member";
import { IClassroomObject } from "@/interface/classroom";

// GET ALL MEMBERS
const getAllMembers = createAsyncThunk("member/getAllMembers", async () => {
  const response = await axios.get("http://localhost:5000/api/member", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get all members");
});

// GET ALL MEMBER BY CLASSROOM ID
const getAllMemberClassroom = createAsyncThunk(
  "member/getAllMemberClassroom",
  async (postData: IClassroomObject) => {
    const response = await axios.get(
      `http://localhost:5000/api/member/class/${postData.id || ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to get all members in classroom");
  }
);

// ADD NEW MEMBER
const createMember = createAsyncThunk(
  "member/createMember",
  async (postData: IMemberObject) => {
    const response = await axios.post(
      "http://localhost:5000/api/member",
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
    throw new Error("Failed to create new member");
  }
);

// DELETE FROM LIST REQUIREMENTS
const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (postData: IMemberObject) => {
    const response = await axios.delete(
      `http://localhost:5000/api/member/${postData?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete member");
  }
);

export { getAllMembers, deleteMember, createMember, getAllMemberClassroom };
