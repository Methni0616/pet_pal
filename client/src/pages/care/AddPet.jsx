import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AddPet.css";

export default function AddPet() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "Male",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();

      formData.append("name", pet.name);
      formData.append("species", pet.species);
      formData.append("breed", pet.breed);
      formData.append("age", pet.age);
      formData.append("gender", pet.gender);

      if (image) {
        formData.append("image", image);
      }

      if (user?._id) {
        formData.append("ownerId", user._id);
      }

      if (user?.name) {
        formData.append("ownerName", user.name);
      }

      await axios.post("http://localhost:5000/api/pets/add", formData);

      alert("Pet Added Successfully 🐾");

      navigate("/care");
    } catch (error) {
      console.error(error);

      alert("Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addpet-container">
      <div className="addpet-card">
        <h1>🐾 Add New Pet</h1>

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
            name="species"
            placeholder="Species"
            value={pet.species}
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
            type="number"
            name="age"
            placeholder="Age"
            value={pet.age}
            onChange={handleChange}
            required
          />

          <select name="gender" value={pet.gender} onChange={handleChange}>
            <option value="Male">Male</option>

            <option value="Female">Female</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-image"
            />
          )}

          <button type="submit">{loading ? "Uploading..." : "Add Pet"}</button>
        </form>
      </div>
    </div>
  );
}
