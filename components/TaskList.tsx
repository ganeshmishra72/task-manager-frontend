"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/TaskStore";  

export default function TaskList() {
  const { tasks, getTasks, deleteTask, updateTask } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-bold mb-4 text-black">
        All Tasks
      </h2>

      <table className="w-full text-black">

        <thead>
          <tr className="border-b">
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.id} className="border-b">

              <td>{task.title}</td>

              <td>{task.description}</td>

              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTask(task.id, {
                      ...task,
                      status: e.target.value,
                    })
                  }
                  className="border p-1"
                >
                  <option>PENDING</option>
                  <option>IN_PROGRESS</option>
                  <option>COMPLETED</option>
                </select>
              </td>

              <td>
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
  );
}