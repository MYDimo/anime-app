import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { userRegister } from "../../services/authService";
import { useState } from "react";


export const CreateProfilePage = () => {
    const navigate = useNavigate();
    const { onUserLogin } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const submitCredentialsHandler = (e) => {
        e.preventDefault();

        const { email, password, rePassword } = Object.fromEntries(new FormData(e.target))

        if (email.length == 0 || password.length == 0 || rePassword.length == 0) {
            setErrorMessage('All fields must be filled')
        }
        else if (password !== rePassword) {
            setErrorMessage('Passwords are not matching');
        } else if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            setErrorMessage('Invalid email');
        } else {
            userRegister(email, password)
                .then(authData => {
                    if (authData.code !== 409) {
                        onUserLogin(authData);
                        navigate('/');
                    } else {
                        setErrorMessage(authData.message);
                    }
                })
        }
    };

    return (
        <div className="pageWrapper">
            <h1>Create a profile</h1>
            <form action="submit" onSubmit={submitCredentialsHandler}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="password" name="rePassword" placeholder="repeat-password" />
                <button>Create</button>
            </form>
            {errorMessage &&
                <div className="div">
                    <p className="errorMessage">{errorMessage}</p>
                </div>
            }
        </div>
    );
}