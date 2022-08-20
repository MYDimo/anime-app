import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useState } from "react";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { onUserLogin } = useContext(AuthContext);
    const { setUserFavourites } = useContext(ProfileContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const submitCredentialsHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        if (!email || !password) {
            setErrorMessage("Please fill out all fields")
        } else {
            userLogin(email, password)
                .then(authData => {
                    if (authData.code !== 403) {
                        onUserLogin(authData);
                        navigate('/');
                    } else {
                        setErrorMessage(authData.message);
                    }
                })
                .then(() => {
                    setUserFavourites(
                        {
                            animes: [],
                            characters: [],
                            _id: ""
                        }
                    )
                })
        }
    }

    return (
        <div className="pageWrapper">
            <h1>This is the Login Page</h1>
            <form action="submit" onSubmit={submitCredentialsHandler} className="searchWrapper">
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                {errorMessage &&
                    <p className="errorMessage">{errorMessage}</p>
                }
                <button>Log in</button>
            </form>
            <p>Don't have a profile? <Link to={'/create-profile'}>Create one</Link>.</p>
        </div>
    );
}