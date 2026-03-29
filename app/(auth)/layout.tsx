import React from 'react'

interface AuthData{
    children:React.ReactNode
}
const layout = ({children}:AuthData) => {
  return (
    <main>{children}</main>
  )
}

export default layout
