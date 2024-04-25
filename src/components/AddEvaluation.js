import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./NavBar";
import ErrorMessagePopup from "./ErrorMessagePopup";

const AddEvaluation = () => {
    const [evaluateeId, setEvaluateeId] = useState("");
    const [workQualityScore, setWorkQualityScore] = useState("");
    const [workQualityComment, setWorkQualityComment] = useState("");
    const [taskCompletionScore, setTaskCompletionScore] = useState("");
    const [taskCompletionComment, setTaskCompletionComment] = useState("");
    const [aboveAndBeyondScore, setAboveAndBeyondScore] = useState("");
    const [aboveAndBeyondComment, setAboveAndBeyondComment] = useState("");
    const [communicationScore, setCommunicationScore] = useState("");
    const [communicationComment, setCommunicationComment] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addEvaluationDetails = async () => {
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                navigate("/");
                
                return;
            }

            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post(
                `http://localhost:8000/api/v1/evaluations/create/${evaluateeId}`,
                {
                    workQualityScore,
                    workQualityComment,
                    taskCompletionScore,
                    taskCompletionComment,
                    aboveAndBeyondScore,
                    aboveAndBeyondComment,
                    communicationScore,
                    communicationComment,
                    month,
                    year,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const evaluationData = response.data;
            console.log(evaluationData);

            setSuccess("Created");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

           } catch (error) {
            setError(error.response.data.data);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                setError(error.response.data.data);
                console.error(error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvaluationDetails();
    };

    const handleCloseErrorPopup = () => {
        setError("");
    };

    const handleSignOut = () => {
        Cookies.remove("accessToken");
        navigate("/dashboard");
    };

  return (
    <div className="profile__container">
      <Navbar firstName={firstName} handleSignOut={handleSignOut} />
      <h2 className="profile-text">Add Evaluation</h2>
      <div className='signup__container'>
            {success && <p className="success-message">{success}</p>}
            <form className='signup__form' onSubmit={handleSubmit}>
                <label htmlFor='evaluateeId'>Evaluatee ID</label>
                <input
                    type='number'
                    id='evaluateeId'
                    name='evaluateeId'
                    value={evaluateeId}
                    required
                    onChange={(e) => setEvaluateeId(e.target.value)}
                />
                <label htmlFor='workQualityScore'>Work Quality Score</label>
                <input
                    type='number'
                    id='workQualityScore'
                    name='workQualityScore'
                    value={workQualityScore}
                    required
                    onChange={(e) => setWorkQualityScore(e.target.value)}
                />
                <label htmlFor='workQualityComment'>Work Quality Comment</label>
                <input
                    type='text'
                    id='workQualityComment'
                    name='workQualityComment'
                    value={workQualityComment}
                    required
                    onChange={(e) => setWorkQualityComment(e.target.value)}
                />
                <label htmlFor='taskCompletionScore'>Task Completion Score</label>
                <input
                    type='number'
                    id='taskCompletionScore'
                    name='taskCompletionScore'
                    value={taskCompletionScore}
                    required
                    onChange={(e) => setTaskCompletionScore(e.target.value)}
                />
                <label htmlFor='taskCompletionComment'>Task Completion Comment</label>
                <input
                    type='text'
                    id='taskCompletionComment'
                    name='taskCompletionComment'
                    value={taskCompletionComment}
                    required
                    onChange={(e) => setTaskCompletionComment(e.target.value)}
                />
                <label htmlFor='aboveAndBeyondScore'>Above And Beyond Score</label>
                <input
                    type='number'
                    id='aboveAndBeyondScore'
                    name='aboveAndBeyondScore'
                    value={aboveAndBeyondScore}
                    required
                    onChange={(e) => setAboveAndBeyondScore(e.target.value)}
                />
                <label htmlFor='aboveAndBeyondComment'>Above And Beyond Comment</label>
                <input
                    type='text'
                    id='aboveAndBeyondComment'
                    name='aboveAndBeyondComment'
                    value={aboveAndBeyondComment}
                    required
                    onChange={(e) => setAboveAndBeyondComment(e.target.value)}
                />
                <label htmlFor='communicationScore'>Communication Score</label>
                <input
                    type='number'
                    id='communicationScore'
                    name='communicationScore'
                    value={communicationScore}
                    required
                    onChange={(e) => setCommunicationScore(e.target.value)}
                />
                <label htmlFor='communicationComment'>Communication Comment</label>
                <input
                    type='text'
                    id='communicationComment'
                    name='communicationComment'
                    value={communicationComment}
                    required
                    onChange={(e) => setCommunicationComment(e.target.value)}
                />
                <label htmlFor='month'>Month</label>
                <input
                    type='text'
                    id='month'
                    name='month'
                    value={month}
                    required
                    onChange={(e) => setMonth(e.target.value)}
                />
                <label htmlFor='year'>Year</label>
                <input
                    type='text'
                    id='year'
                    name='year'
                    value={year}
                    required
                    onChange={(e) => setYear(e.target.value)}
                />
                <button className='loginBtn' disabled={loading}>
                    {loading ? "Loading..." : "ADD EVALUATION"}
                </button>
            </form>
            {error && (
                <ErrorMessagePopup message={error} onClose={handleCloseErrorPopup} />
            )}
        </div>
    </div>
  );
};

export default AddEvaluation;
