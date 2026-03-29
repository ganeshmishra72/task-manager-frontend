"use client";

import api from "@/config/APIClinet";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRouter } from "next/navigation";

interface AuthState {
  user: any;
  token: string | null;
   refreshToken: string | null;
  loading: boolean;

  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshAccessToken: ()=>void

  getProfile: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken:null,
      loading: false,

    
      login: async (data) => {
        try {
          set({ loading: true });

          const res = await api.post("/api/v1/auth/login", data);

          console.log("LOGIN RESPONSE:", res.data);

   
    const token = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    const user = res.data.user;

    if (!token || !refreshToken) {
      toast.error("Tokens not received from server");
      return;
    }

          // store token
          localStorage.setItem("token", token);
           localStorage.setItem("refreshToken", refreshToken);

          set({
            token: token,
            user: user,
             refreshToken:refreshToken,
            loading: false,
          });

          toast.success("Login Successfully");

          window.location.href = "/";
        } catch (error: any) {
          console.log(error);
          set({ loading: false });

          toast.error(
            error?.response?.data?.message || "Login Failed"
          );
        }
      },

      refreshAccessToken: async () => {
  try {
    const refreshToken = get().refreshToken || localStorage.getItem("refreshToken");
    if (!refreshToken) {
      toast.error("No refresh token available");
      return;
    }

    const res = await api.post("/api/v1/auth/refresh", { refreshToken });
    const newToken = res.data.accessToken;

    if (!newToken) {
      toast.error("Failed to refresh token");
      return;
    }

    localStorage.setItem("token", newToken);
    set({ token: newToken });

    toast.success("Access token refreshed");
  } catch (error) {
    console.log(error);
    toast.error("Failed to refresh access token");
    get().logout(); // optionally logout on refresh failure
  }
},

      // ================= REGISTER =================

      register: async (data) => {
        try {
          set({ loading: true });

          await api.post("/api/v1/auth/register", data);

          set({ loading: false });

          toast.success("Account Created");

          window.location.href = "/login";
        } catch (error) {
          set({ loading: false });
          toast.error("Register Failed");
        }
      },

      logout: () => {
        localStorage.removeItem("token");

        set({
          user: null,
          token: null,
        });

        toast.success("Logout Successfully");

        window.location.href = "/login";
      },

    
      getProfile: async () => {
        try {
          const res = await api.get("/api/v1/users/me");
            console.log(res);
            
          set({
            user: res.data,
          });
        } catch (error) {
          console.log(error);
          toast.error("Failed To Load Profile");
        }
      },
 
      updateProfile: async (data) => {
        try {
          set({ loading: true });

          await api.put("/api/v1/users/me", data);

          await get().getProfile();

          set({ loading: false });

          toast.success("Profile Updated Successfully");
        } catch (error) {
          console.log(error);
          set({ loading: false });
          toast.error("Failed To Update Profile");
        }
      },

     
  uploadImage: async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const userId = get().user?.id; 
    if (!userId) {
      toast.error("User not found");
      return;
    }

    await api.post(`/api/v1/users/upload-image/${userId}`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

    await get().getProfile();

    toast.success("Image Uploaded Successfully");
  } catch (error) {
    console.log(error);
    toast.error("Image Upload Failed");
  }
},
    }),
    {
      name: "auth-storage-tms",
    }
  )
);