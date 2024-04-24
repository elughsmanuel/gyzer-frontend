import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [firstName, setFirstName] = useState("");

    const navigate = useNavigate();

useEffect(() => {

    const fetchUserProfile = async () => {
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                navigate("/");
                
                return;
            }

            const response = await axios.get("http://localhost:8000/api/v1/users/profile/get-my-profile", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = response.data.data;

            const firstName = data.firstName;
            
            setFirstName(firstName);
        } catch (error) {
            console.error(error);
        }
    };

    fetchUserProfile();

    }, [navigate]);

    const handleSignOut = () => {
        Cookies.remove("accessToken");
        navigate("/");
    };

    return (
        <div className='dashboard'>
            <h2>Hello, {firstName}</h2>
            <button className='signOutBtn' onClick={handleSignOut}>
                LOG OUT
            </button>
        </div>
    );
};

export default Dashboard;
