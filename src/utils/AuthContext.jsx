import React from "react";
import {createContext, useState, useEffect, useContext} from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserOnLoad();
    }, [])

    const getUserOnLoad = async () => {
        try{
            const accountDetails = account.get();
            setUser(accountDetails);
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

        try{
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)
            console.log("Logged In");
            const accountDetails = account.get();
            setUser(accountDetails);
            navigate('/');
        }catch(error){
            console.log(error);
            alert("Invalid credentials");
        }
    }

    const contextData = {
        user,
        handleUserLogin,
    }

    return <AuthContext.Provider value = {contextData}>

            {
                loading ? <p>Loading...</p> : children
            }
        </AuthContext.Provider>
}


export const useAuth = () => {

    return useContext(AuthContext);
}

export default AuthContext;