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
    const [allEvaluationItems, setAllEvaluationsItems] = useState([]);

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

                const allEvaluationsItemsData = allEvaluationResponse.data.data;
                setAllEvaluationsItems(allEvaluationsItemsData);

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
            <div className="main-content">
                <Navbar firstName={firstName} handleSignOut={handleSignOut} />
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
            <div className="evaluation-items">
                    <h2>All Evaluations</h2>
                    {allEvaluationItems.map((evaluation) => (
                        <div key={evaluation.id} className="evaluation-item">
                            <h3>{evaluation.month} {evaluation.year}</h3>
                            <p><strong>Work Quality:</strong> {evaluation.workQualityScore}</p>
                            <p ><strong>Work Quality Comment:</strong> {evaluation.workQualityComment}</p>
                            <p><strong>Task Completion:</strong> {evaluation.taskCompletionScore}</p>
                            <p><strong>Task Completion Comment:</strong> {evaluation.taskCompletionComment}</p>
                            <p><strong>Above and Beyond:</strong> {evaluation.aboveAndBeyondScore}</p>
                            <p><strong>Above And Beyond Comment:</strong> {evaluation.aboveAndBeyondComment}</p>
                            <p><strong>Communication:</strong> {evaluation.communicationScore}</p>
                            <p><strong>Communication Comment:</strong> {evaluation.communicationComment}</p>
                        </div>
                    ))}
                </div>
      </div>
    );
};

export default Dashboard;
