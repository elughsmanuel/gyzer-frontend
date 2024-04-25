// Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./NavBar";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
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
            setUserData(data);
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
    <div className="profile__container">
      <Navbar firstName={firstName} handleSignOut={handleSignOut} />
      <h2 className="profile-text">Profile</h2>
      <div className="profile">
        <div className="profile__box">
            {userData && (
                <div className="profile__details">
                    <p>
                        <strong>First Name:</strong> {userData.firstName}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {userData.lastName}
                    </p>
                    <p>
                        <strong>Email Address:</strong> {userData.email}
                    </p>
                    <p>
                        <strong>Username:</strong> {userData.username}
                    </p>
                    <p>
                        <strong>Role:</strong> {userData.role}
                    </p>
                </div>
            )}
        </div>
        <div className="profile__box">
            {userData && (
                <div className="profile__details">
                    <p>
                    <strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString('en-UK')}
                    </p>
                  
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
