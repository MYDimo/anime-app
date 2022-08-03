import { Link } from "react-router-dom";
import { apiLogin } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const LoginPage = () => {
    const { onUserLogin } = useContext(AuthContext);

    const submitCredentialsHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        console.log('come on');
        apiLogin(email, password).then(authData => {
            onUserLogin(authData)
        })
    }

    return (
        <div className="pageWrapper">
            <h1>This is the Login Page</h1>
            <form action="submit" onSubmit={submitCredentialsHandler}>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <button>Log in</button>
                <p>Don't have a profile? <Link to={'/create-profile'}>Create one</Link>.</p>
            </form>
        </div>

    );
}