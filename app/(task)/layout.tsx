import React from 'react'

interface TaskData{
    children:React.ReactNode
}
const layout = ({children}:TaskData) => {
  return (
    <main>{children}</main>
  )
}

export default layout
