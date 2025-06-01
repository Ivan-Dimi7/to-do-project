import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import "./NavBar.css";

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        setUser(null);
        navigate("/");
    }

    return (
        <nav className="navbar">
            <h2 className="logo">TO-DO LIST</h2>
            <ul className="nav-links">
                {user && (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                )}
                {!user && (
                    <>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
