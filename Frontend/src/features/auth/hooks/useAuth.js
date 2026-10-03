import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api"

/**
 * @name useAuth
 * @description This custom hook is used to access the authentication context and perform authentication operations
 */
export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        //till the api response is not there , we need to show spinner, it comes in the hook layer because we want to show the spinner(state) in the UI till the data is fetched(API layer) , thus state and api are managed here , so hook layer 
        setLoading(true)
        try {
            const data = await login({ email, password })
            //login function od api layer fetched data from the backend and send it to the frontend

            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout() //doesnt return anything
        setUser(null)
        setLoading(false)
    }
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                if (data?.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false); // ✅ Stop loading once the check is done
            }
            //why loading set to false here?
            //to stop the spinner, because the data is fetched and user is set
        }
        getAndSetUser()
    }, [])

    return { handleLogin, handleRegister, handleLogout, user, loading }

    //what does returning user and loading mean ?
    // it means we are returning the current user and the loading state to the component that is using this hook
}