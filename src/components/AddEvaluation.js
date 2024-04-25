// Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./NavBar";

const AddEvaluation = () => {
    const [firstName, setFirstName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                navigate("/");
                
                return;
            }

            const response = await axios.get(
            "http://localhost:8000/api/v1/users/profile/get-my-profile",
            {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            }
            );

            const data = response.data.data;
            
            const firstName = data.firstName;
    
            setFirstName(firstName);
        } catch (error) {
            console.error(error);
        }
        };

        fetchUserData();
    }, [navigate]);

    const handleSignOut = () => {
        Cookies.remove("accessToken");
        navigate("/");
    };

  return (
    <div className="profile__container">
      <Navbar firstName={firstName} handleSignOut={handleSignOut} />
      <h2 className="profile-text">Add Evaluation</h2>

    </div>
  );
};

export default AddEvaluation;
