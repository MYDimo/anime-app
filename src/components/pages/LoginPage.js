import { Link } from "react-router-dom";

export const LoginPage = () => {
    return (
        <div className="pageWrapper">
            <h1>This is the Login Page</h1>
            <form action="submit">
                <input type="text" name="email" placeholder="email"/>
                <input type="password" name="password" placeholder="password" />
                <button>Log in</button>
                <p>Don't have a profile? <Link to={'/create-profile'}>Create one</Link>.</p>
            </form>
        </div>
        
    );
}