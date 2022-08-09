import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { userRegister } from "../../services/authService";


export const CreateProfilePage = () => {
    const navigate = useNavigate();
    const { onUserLogin } = useContext(AuthContext);

    const submitCredentialsHandler = (e) => {
        e.preventDefault();

        const { email, password, rePassword } = Object.fromEntries(new FormData(e.target))
        
        //Check for pass and rePass and throw error, if okay check for other errors
        userRegister(email, password).then(authData => {
            onUserLogin(authData);
            navigate('/');
        })
    }

    return (
        <div className="pageWrapper">
            <h1>Page for creating Profile</h1>
            <form action="submit" onSubmit={submitCredentialsHandler}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="password" name="repeat-password" placeholder="repeat-password" />
                <button>Create a profile</button>
            </form>
        </div>
    );
}