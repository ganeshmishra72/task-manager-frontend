"use client";

import { create } from "zustand";
import api from "@/config/APIClinet";
import toast from "react-hot-toast";

interface AdminState {
  users: any[];
  tasks: any[];
  loading: boolean;

  // Users
  getAllUsers: () => Promise<void>;
  createUser: (data: any) => Promise<void>;
  updateUser: (id: string, data: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  // Tasks (Admin)
  getAllTasks: () => Promise<void>;
  getTaskById: (id: string) => Promise<any>;
  updateTaskStatus: (id: string, status: string) => Promise<void>;
   updateTask: (id: string, data: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  tasks: [],
  loading: false,

  // ================= USERS =================

  getAllUsers: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/api/v1/users");
      set({ users: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load users");
    }
  },

  createUser: async (data) => {
    try {
      await api.post("/api/v1/users", data);
      toast.success("User Created");
      get().getAllUsers();
    } catch (error) {
      toast.error("User creation failed");
    }
  },

  updateUser: async (id, data) => {
    try {
      await api.put(`/api/v1/users/update/${id}`, data);
      toast.success("User Updated");
      get().getAllUsers();
    } catch (error) {
      toast.error("User update failed");
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/api/v1/users/delete/${id}`);
      toast.success("User Deleted");
      get().getAllUsers();
    } catch (error) {
      toast.error("User delete failed");
    }
  },

  // ================= TASKS (ADMIN) =================

  getAllTasks: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/api/v1/tasks/all");
      set({ tasks: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load tasks");
    }
  },

  getTaskById: async (id) => {
    try {
      const res = await api.get(`/api/v1/tasks/id/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch task");
    }
  },

  updateTaskStatus: async (id, status) => {
    try {
      await api.put(`/api/v1/tasks/updateStatus/${id}`, status);
      toast.success("Task Status Updated");
      get().getAllTasks();
    } catch (error) {
      toast.error("Status update failed");
    }
  },
  updateTask: async (id, data) => {
    try {
      await api.put(`/api/v1/tasks/${id}`, data);
      toast.success("Task Updated Successfully");
      get().getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Task update failed");
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/api/v1/tasks/my/${id}`);
      toast.success("Task Deleted Successfully");
      get().getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Task delete failed");
    }
  },
}));