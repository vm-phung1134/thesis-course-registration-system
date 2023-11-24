import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject, IMemberObjectInput } from "@/interface/member";
import { IClassroomObject } from "@/interface/classroom";
import { IAuthObject } from "@/interface/auth";

const apiURL = `http://qthuy2k1.shop/api/member`;

// GET ALL MEMBERS
const getAllMembers = createAsyncThunk("member/getAllMembers", async () => {
  const response = await axios.get(`${apiURL}`, {
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
  async (postData: IClassroomObject | null) => {
    const response = await axios.get(`${apiURL}/class/${postData?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.members;
    }
    throw new Error("Failed to get all members in classroom");
  }
);

// GET ONE MEMBER
const getMember = createAsyncThunk(
  "member/getMember",
  async (postData: IAuthObject) => {
    const response = await axios.get(
      `${apiURL}/${postData.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.member;
    }
    throw new Error("Failed to get one classroom");
  }
);

// ADD NEW MEMBER
const createMember = createAsyncThunk(
  "member/createMember",
  async (postData: Omit<IMemberObjectInput, "id">) => {
    const response = await axios.post(
      `${apiURL}`,
      { "member": postData },
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
    const response = await axios.delete(`${apiURL}/${postData?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete member");
  }
);

const updateMember = createAsyncThunk(
  "member/updateMember",
  async (postData: IMemberObject) => {
    const response = await axios.put(
      `${apiURL}/${postData.id}`,
      { "member": postData },
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

export {
  getAllMembers,
  deleteMember,
  createMember,
  getMember,
  updateMember,
  getAllMemberClassroom,
};
