import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
