import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful!");

      if (res.data.role === "admin") {
        navigate("/admin-adoptions");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">Login to access your Pet Pal account 🐾</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <span onClick={() => navigate("/register")} className="auth-link">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
