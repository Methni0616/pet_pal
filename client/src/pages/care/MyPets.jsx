// src/pages/care/MyPets.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MyPets.css";

export default function MyPets() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pets, setPets] = useState([]);

  // If newPet was passed from AddPet, add it to the list
  useEffect(() => {
    if (location.state?.newPet) {
      setPets((prev) => [...prev, location.state.newPet]);
    }
  }, [location.state]);

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

      {/* Display added pets */}
      <div className="pets-list">
        {pets.length === 0 ? (
          <p className="no-pets">No pets added yet. 🐾</p>
        ) : (
          pets.map((pet, index) => (
            <div key={index} className="pet-card">
              <h3>{pet.name}</h3>
              <p>🐶 Breed: {pet.breed}</p>
              <p>🎂 Age: {pet.age}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
