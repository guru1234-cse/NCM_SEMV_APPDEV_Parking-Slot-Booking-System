import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

    }, [token]);

    const login = (jwt) => {

        localStorage.setItem("token", jwt);
        setToken(jwt);
        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};