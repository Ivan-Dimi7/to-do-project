import Dashboard from "./components/Dashboard"
import Register from "./components/Register";
import Login from "./components/Login"
import { Routes, Route } from 'react-router-dom';
import { createContext, useState} from 'react';

export const UserContext = createContext(null);

function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
