import React from 'react'

interface AdminData{
    children:React.ReactNode
}
const layout = ({children}:AdminData) => {
  return (
    <main>{children}</main>
  )
}

export default layout
