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
        
        if (email.length == 0 || password.length == 0 || rePassword.length == 0) {
            console.log('All fields must be filled')
        }
        else if (password !== rePassword) {
            console.log('Passwords are not matching');
        } else {
            userRegister(email, password)
            .then(authData => {
                if (authData.code !== 409) {
                    onUserLogin(authData);
                    navigate('/');
                } else {
                    console.log(authData.message);
                }
            })
        }
    }

    return (
        <div className="pageWrapper">
            <h1>Page for creating Profile</h1>
            <form action="submit" onSubmit={submitCredentialsHandler}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="password" name="rePassword" placeholder="repeat-password" />
                <button>Create a profile</button>
            </form>
        </div>
    );
}