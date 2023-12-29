import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token } from "../auth/type";
import { IMemberObject } from "@/interface/member";
import { IClassroomObject } from "@/interface/classroom";
import { apiURL } from "@/data";

// GET ALL MEMBERS
const getAllMembers = createAsyncThunk("member/getAllMembers", async () => {
  const response = await axios.get(`${apiURL}/member`, {
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
  async (classroom: IClassroomObject | null) => {
    const response = await axios.get(
      `${apiURL}/member/class/${classroom?.id}`,
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

// GET ONE MEMBER
const getMember = createAsyncThunk("member/getMember", async (id: string) => {
  const response = await axios.get(`${apiURL}/member/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to get one classroom");
});

// ADD NEW MEMBER
const createMember = createAsyncThunk(
  "member/createMember",
  async (member: Omit<IMemberObject, "id">) => {
    const response = await axios.post(`${apiURL}/member`, member, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to create new member");
  }
);

// DELETE FROM LIST REQUIREMENTS
const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (member: IMemberObject) => {
    const response = await axios.delete(`${apiURL}/member/${member?.id}`, {
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
  async (member: IMemberObject) => {
    const response = await axios.put(`${apiURL}/member/${member.id}`, member, {
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

export {
  getAllMembers,
  deleteMember,
  createMember,
  getMember,
  updateMember,
  getAllMemberClassroom,
};
