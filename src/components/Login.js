import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ErrorMessagePopup from "./ErrorMessagePopup";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const gotoSignUpPage = () => navigate("/sign-up");

    const postLoginDetails = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post(
                "http://localhost:8000/api/v1/auth/login",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;
            console.log(data);

            Cookies.set("accessToken", data.accessToken);
            
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data.data);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postLoginDetails();
    };

    const handleCloseErrorPopup = () => {
        setError("");
      };

    return (
        <div className='login__container'>
            <h2>Login </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
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
               <button className='loginBtn' disabled={loading}>
                    {loading ? "Loading..." : "LOGIN"}
                </button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
            {error && (
                <ErrorMessagePopup message={error} onClose={handleCloseErrorPopup} />
            )}
        </div>
    );
};

export default Login;
