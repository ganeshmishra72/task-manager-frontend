import TaskForm from '@/components/TaskFrom'
import TaskList from '@/components/TaskList'
import React from 'react'

const page = () => {
  return (
     <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6 text-black">
        Task Management
      </h1>

      <TaskForm />

      <TaskList />

    </div>
  )
}

export default page
