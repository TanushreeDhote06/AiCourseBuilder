import axios from "axios";

const api=axios.create({  
    //we create the instance here for axios
    //it will automatically append the base url to the request
    //so we can just use the relative path
    //
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})
export async function register({ username, email, password }) {

    try {

        const response = await api.post("/auth/register",
            { username, email, password }
           )
            return response.data 
            //to whom are we returning the data ?
            // we are returning the data to the caller of the function 
    }catch(err){
        console.log(err)
    }
}

export async function login({email,password}){
    try{
        const response= await api.post("/auth/login",
            {email,password}
           )
        //here withCredentials true means we are sending the cookies to the server because by default 
        // browser does not send cookies to the server with the request
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
        const response =await api.get("/auth/logout")
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function getMe(){
    //why does this function doesnt req any parameters?
    //because the axios instance is created with withCredentials:true
    //so the browser will send the cookies to the server with the request
    //and the server will send the user data to the client
    try{
        const response =await api.get("/auth/get-me")
        return response.data
    }catch(err){
        console.log(err)
    }
}