import { useState, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { UserContext } from "../App";
import "./Login.css"

function Login() {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const login = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3001/users?username=${username}&password=${pass}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    setUser(users[0]);
                    navigate("/dashboard");
                } else {
                    alert('Invalid username or password!!!');
                }
            });
    };

    return (
        <div id="login-form-wrapper">
            <form onSubmit={login} id="login-form">
                <h2 id="login-title">Login</h2>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                />
                <button type="submit">LOGIN</button>
            </form>
            <p id="register-link">
                <Link to="/register">New user? Register here</Link>
            </p>
        </div>
    );
}

export default Login;
