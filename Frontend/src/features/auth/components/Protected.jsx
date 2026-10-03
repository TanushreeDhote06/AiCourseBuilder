import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Spinner from "./Spinner";
const Protected = ({children})=>{
    const { user ,loading, }= useAuth()
    if(loading){
        return (
            <main>
                <Spinner/>
            </main>
        )
    }
    if(!user){
        return < Navigate to={"/login"}/>
    }
    return children
}

export default Protected