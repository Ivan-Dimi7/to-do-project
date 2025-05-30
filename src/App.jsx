import Dashboard from "./components/Dashboard"
import Register from "./components/Register";
import Login from "./components/Login"
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
        </Routes>
    );
}

export default App
