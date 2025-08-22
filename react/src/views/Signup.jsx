import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    const errors = response.data.errors;
                    setErrors(errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>

                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
