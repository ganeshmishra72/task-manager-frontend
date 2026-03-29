"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/store/AuthStore"; 
import Link from "next/link";

export default function LoginPage() {
  const { login, loading } = useAuthStore();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  console.log(login);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          <Form className="space-y-4">

            <div>
              <label>Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
            </div>

            <div>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600">
                Register
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
}