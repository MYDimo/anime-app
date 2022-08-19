import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { userAuth, onUserLogout } = useContext(AuthContext);
    const { userFavourites, setUserFavourites } = useContext(ProfileContext);

    useEffect(() => {
        userLogout(userAuth.accessToken)
            .then(() => {
                onUserLogout();
                setUserFavourites({
                    animes: [],
                    characters: [],
                    _id: ""
                })
                navigate('/');
            })
            .catch(() => {
                onUserLogout();
                navigate('/');
            })
    })

    return null;
}