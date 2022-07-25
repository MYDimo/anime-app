import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/navigation.css"


export const Navigation = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {/* <Link to="/anime-list">Anime-list</Link> */}
            <Link to="/create-profile">Create Profile</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
        </nav>
    ); 
}