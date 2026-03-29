"use client";

import { create } from "zustand";
import api from "@/config/APIClinet";
import toast from "react-hot-toast";

interface TaskState {
  tasks: any[];
  loading: boolean;

  getTasks: () => Promise<void>;
  createTask: (data: any) => Promise<void>;
  updateTask: (id: string, data: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,

  // Get All Tasks
  getTasks: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/api/v1/tasks/my");

      set({
        tasks: res.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      toast.error("Failed to load tasks");
    }
  },

  // Create Task
  createTask: async (data) => {
    try {
      await api.post("/api/v1/tasks/my", data);

      toast.success("Task Created");

      get().getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Task creation failed");
    }
  },

  // Update Task
  updateTask: async (id, data) => {
    try {
      await api.put(`/api/v1/tasks/${id}`, data);

      toast.success("Task Updated");

      get().getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  },

  // Delete Task
  deleteTask: async (id) => {
    try {
      await api.delete(`/api/v1/tasks/my/${id}`);

      toast.success("Task Deleted");

      get().getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  },
}));