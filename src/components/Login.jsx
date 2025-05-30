import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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
        <form onSubmit={login}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
