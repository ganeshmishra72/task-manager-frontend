"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { Formik, Form, Field } from "formik";

export default function ProfilePage() {
  const { user, getProfile, updateProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 sm:p-8 md:p-10">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center md:text-left">
          Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-black">

          {/* Profile Image */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={user?.image || "/car5.png"}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 rounded-full object-cover border"
            />

            <input
              type="file"
              className="mt-4 w-full md:w-auto"
              onChange={async (e) => {
                if (e.target.files?.[0]) {
                  await useAuthStore.getState().uploadImage(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            <Formik
              initialValues={{
                username: user?.username,
                email: user?.email,
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await updateProfile(values);
                  setSubmitting(false);
                } catch (error) {
                  setSubmitting(false);
                }
              }}
            >
              <Form className="space-y-4">

                <div>
                  <label className="block mb-1">Username</label>
                  <Field
                    name="username"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <Field
                    name="email"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">Role</label>
                  <input
                    value={user?.role}
                    disabled
                    className="w-full border p-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1">Provider</label>
                  <input
                    value={user?.provider}
                    disabled
                    className="w-full border p-2 rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block mb-1">Status</label>
                  <input
                    value={user?.enable ? "Active" : "Disabled"}
                    disabled
                    className="w-full border p-2 rounded bg-gray-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Update Profile
                </button>

              </Form>
            </Formik>
          </div>

        </div>
      </div>
    </div>
  );
}