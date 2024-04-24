import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [managerId, setManagerId] = useState("");

    const navigate = useNavigate();

    const gotoLoginPage = () => navigate("/");

    const postSignUpDetails = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/auth/sign-up",
                {
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    confirmPassword,
                    managerId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            console.log(data);

            if (data.error_message) {
                alert(data.error_message);
            } else {
                alert('CREATED');
                
            }

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        postSignUpDetails();

        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setManagerId("");
    };

    return (
        <div className='signup__container'>
             <h1>Gyzer Tech</h1>
            <h2>Sign up </h2>
            <form className='signup__form' onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastName'>Last Name</label>
                <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor='managerId'>Manager ID</label>
                <input
                    type='number'
                    id='managerId'
                    name='managerId'
                    value={managerId}
                    required
                    onChange={(e) => setManagerId(e.target.value)}
                />
                <button className='signupBtn'>SIGN UP</button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
