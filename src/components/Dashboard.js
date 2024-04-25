import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./NavBar";

const Dashboard = () => {
    const [firstName, setFirstName] = useState("");
    const [allEvaluations, setAllEvaluations] = useState("");
    const [sentEvaluations, setSentEvaluations] = useState("");
    const [receivedEvaluations, setReceivedEvaluations] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserData = async () => {
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

                const allEvaluationResponse = await axios.get("http://localhost:8000/api/v1/evaluations/get-my-evaluations", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const allEvaluationsData = allEvaluationResponse.data.data.length;
                setAllEvaluations(allEvaluationsData);

                const sentEvaluationResponse = await axios.get("http://localhost:8000/api/v1/evaluations/get-my-evaluations?type=sent", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const sentEvaluationsData = sentEvaluationResponse.data.data.length;
                setSentEvaluations(sentEvaluationsData);

                const receivedEvaluationResponse = await axios.get("http://localhost:8000/api/v1/evaluations/get-my-evaluations?type=received", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const receivedEvaluationsData = receivedEvaluationResponse.data.data.length;
                setReceivedEvaluations(receivedEvaluationsData);

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
        <div className="dashboard__box">
        <Navbar firstName={firstName} handleSignOut={handleSignOut} />
        <div className="main-content">
            <h2 className="evaluation-text">Evaluations</h2>
        <div className="eva-box">
        <div className="evaluation-box">
            <h3>All</h3>
            <h4>{allEvaluations}</h4>
        </div>
        <div className="evaluation-box">
            <h3>Sent</h3>
            <h4>{sentEvaluations}</h4>
        </div>
        <div className="evaluation-box">
            <h3>Received</h3>
            <h4>{receivedEvaluations}</h4>
        </div>
        </div>
      </div>
      </div>
    );
};

export default Dashboard;
