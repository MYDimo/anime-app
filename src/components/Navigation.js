import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import "../styles/navigation.css";


export const Navigation = () => {
    const {userAuth} = useContext(AuthContext);
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/search-Anime">Search Anime</Link>
            {Object.keys(userAuth).length?
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>
                </>
                :
                <>
                    <Link to="/create-profile">Create Profile</Link>
                    <Link to="/login">Login</Link>
                </>
            }
            
            
        </nav>
    ); 
}