import { useState } from 'react';
import {useNavigate} from "react-router-dom";

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
        <form onSubmit={registerUser}>
            <h2>Register</h2>
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
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
