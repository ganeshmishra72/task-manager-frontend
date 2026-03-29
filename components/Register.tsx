"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/store/AuthStore"; 
import Link from "next/link";

export default function RegisterPage() {
  const { register, loading } = useAuthStore();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={register}
        >
          <Form className="space-y-4">

            <div>
              <label>Name</label>
              <Field
                name="name"
                className="w-full border p-2 rounded mt-1"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
            </div>

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
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </p>

          </Form>
        </Formik>
      </div>
    </div>
  );
}