import { create } from "axios";
import { createContext, useState } from "react";
//createContext() and useContext() solves the problem of prop drilling
export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)

    
    return (
        //here the value is an object of state and setter function
        // so we can pass the value to any child component without prop drilling
        //what is AuthContext.Provider ? 
        // AuthContext.Provider is a component that is used to pass the value to any child component
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
        //this {children} here means the components that are wrapped by the AuthProvider
        //so we can pass the value to any child component without prop drilling
    )
}