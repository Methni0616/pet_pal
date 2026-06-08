import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration Successful!"
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join the Pet Pal family and
          start your journey 🐾
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
            className="auth-link"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}