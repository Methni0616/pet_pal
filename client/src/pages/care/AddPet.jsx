// src/pages/care/AddPet.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPet.css";

export default function AddPet() {
  const [pet, setPet] = useState({ name: "", breed: "", age: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new pet to MyPets page
    navigate("/care", { state: { newPet: pet } });
  };

  return (
    <div className="addpet-container">
      <h2>➕ Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={pet.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={pet.breed}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={pet.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}
