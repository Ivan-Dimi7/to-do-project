import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./Register.css"

function Register() {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();

        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        fetch('http://localhost:3001/users?username=' + username)
            .then(res => res.json())
            .then(users => {
                if (users.length === 0) {

                    const newUser = { username, password: pass };
                    fetch('http://localhost:3001/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newUser)
                    }).then(res => res.json())
                        .then(() => {
                            navigate('/');
                        });

                } else {
                    alert("Username already exists");
                }
            });
    };

    return (
        <div id="register-form-wrapper">
            <form id="register-form" onSubmit={registerUser}>
                <h2 id="register-title">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                />
                <button type="submit">REGISTER</button>
            </form>
            <p id="login-link">
                <Link to="/">Already registered? Login here</Link>
            </p>
        </div>
    );
}

export default Register;
