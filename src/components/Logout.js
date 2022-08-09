import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { userLogout } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { userAuth, onUserLogout } = useContext(AuthContext);

    useEffect(() => {
        userLogout(userAuth.accessToken)
            .then(() => {
                onUserLogout();
                navigate('/');
            })
            .catch(() => {
                onUserLogout();
                navigate('/');
            })
    })

    return null;
}