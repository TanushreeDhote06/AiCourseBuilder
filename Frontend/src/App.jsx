import React from "react"
import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx" 
// this will wrap the entire application and provide the authentication state to all components without prop drilling 

function App() {

  return (
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
