// src/pages/care/MyPets.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPets.css";

export default function MyPets() {
  const navigate = useNavigate();

  return (
    <div className="mypets-container">
      <h1>🐕 My Pets</h1>
      <p>Manage and view all your beloved pets here 💖</p>

      <div className="care-buttons">
        <button onClick={() => navigate("/care/add")}>➕ Add a Pet</button>
        <button onClick={() => navigate("/care/health")}>💊 Health Records</button>
        <button onClick={() => navigate("/care/reminders")}>🕒 Reminders</button>
        <button onClick={() => navigate("/care/activity")}>🚶 Activity Tracker</button>
        <button onClick={() => navigate("/care/gallery")}>📸 Pet Gallery</button>
      </div>
    </div>
  );
}
