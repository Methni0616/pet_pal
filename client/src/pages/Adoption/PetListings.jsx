import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PetListings.css";

export default function PetListings() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pets")
      .then((res) => {
        setPets(res.data);
      })
      .catch((err) => {
        console.error("Error loading pets:", err);
      });
  }, []);

  const addToFavorites = (pet) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadySaved = existing.some((item) => item._id === pet._id);

    if (!alreadySaved) {
      existing.push(pet);

      localStorage.setItem("favorites", JSON.stringify(existing));

      alert(`${pet.name} added to favorites ❤️`);
    } else {
      alert(`${pet.name} is already in favorites!`);
    }
  };

  return (
    <div className="pet-listings-page">
      <h1 className="pet-listings-title">🐾 Available Pets for Adoption</h1>

      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search pets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchInput"
        />
      </div>
      <div className="pet-grid">
        {pets
          .filter(
            (pet) =>
              pet.name.toLowerCase().includes(search.toLowerCase()) ||
              pet.species.toLowerCase().includes(search.toLowerCase()) ||
              pet.breed.toLowerCase().includes(search.toLowerCase()),
          )
          .map((pet) => (
            <div className="pet-card" key={pet._id}>
              <img
                src={
                  pet.image ||
                  "https://images.unsplash.com/photo-1517849845537-4d257902454a"
                }
                alt={pet.name}
                className="pet-image"
              />

              <h3>{pet.name}</h3>

              <p className="pet-info">
                {pet.species || "Pet"} • {pet.breed} • {pet.age}
              </p>

              <div className="btn-row">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/adopt/${pet._id}`)}
                >
                  View Details
                </button>

                <button className="fav-btn" onClick={() => addToFavorites(pet)}>
                  ❤️ Add
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
