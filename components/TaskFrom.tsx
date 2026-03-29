"use client";

import { Formik, Form, Field } from "formik";
import { useTaskStore } from "@/store/TaskStore"; 

export default function TaskForm() {
  const { createTask } = useTaskStore();

  return (
    <div className="bg-white p-6 rounded shadow mb-6">

      <h2 className="text-xl font-bold mb-4 text-black">
        Create Task
      </h2>

      <Formik
        initialValues={{
          title: "",
          description: "",
          status: "PENDING",
        }}
        onSubmit={(values, { resetForm }) => {
          createTask(values);
          resetForm();
        }}
      >
        <Form className="space-y-4 text-black">

          <Field
            name="title"
            placeholder="Task Title"
            className="w-full border p-2 rounded"
          />

          <Field
            name="description"
            placeholder="Task Description"
            className="w-full border p-2 rounded"
          />

          <Field
            as="select"
            name="status"
            className="w-full border p-2 rounded"
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </Field>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Task
          </button>

        </Form>
      </Formik>
    </div>
  );
}