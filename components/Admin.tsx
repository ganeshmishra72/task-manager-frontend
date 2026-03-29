"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/AdminStore";  
import { Formik, Form, Field } from "formik";

export default function AdminDashboard() {
  const { users, tasks, getAllUsers, getAllTasks, deleteUser, deleteTask, updateTask , updateTaskStatus } = useAdminStore();
  const [tab, setTab] = useState<"users" | "tasks">("users");

  useEffect(() => {
    getAllUsers();
    getAllTasks();
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("users")}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === "tasks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("tasks")}
        >
          Tasks
        </button>
      </div>

      {/* Users Tab */}
      {tab === "users" && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tasks Tab */}
      {tab === "tasks" && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">All Tasks</h2>

          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2">
                    <select
  value={task.status}
  onChange={(e) =>
    updateTaskStatus(task.id, e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED")
  }
  className="border p-1 rounded"
>
  <option value="PENDING">PENDING</option>
  <option value="IN_PROGRESS">IN_PROGRESS</option>
  <option value="COMPLETED">COMPLETED</option>
</select>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}