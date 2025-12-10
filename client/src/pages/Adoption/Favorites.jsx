import React, { useEffect, useState } from "react";
import "./Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Remove pet from fvotes
  const removeFavorite = (id) => {
    const updated = favorites.filter((pet) => pet.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">❤️ Your Favorite Pets</h1>

      {/* If no favorites saved */}
      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194279.png"
            alt="Empty"
            className="empty-img"
          />
          <h2>No favorites yet</h2>
          <p>Tap the ❤️ button on any pet to save it!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((pet) => (
            <div className="favorites-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} className="favorites-card-img" />

              <h3>{pet.name}</h3>
              <p className="fav-info">{pet.species} • {pet.breed}</p>

              <button
                className="remove-btn"
                onClick={() => removeFavorite(pet.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
