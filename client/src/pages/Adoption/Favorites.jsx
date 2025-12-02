import React from "react";
import "./Favorites.css";

export default function Favorites() {
  const savedPets = []; // Later: load from localStorage or API

  return (
    <div className="favorites-container">
      <h1 className="fav-title">Your Favorite Pets ❤️</h1>

      {savedPets.length === 0 ? (
        <div className="empty-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194279.png"
            alt="No favorites"
            className="empty-img"
          />
          <h2>No Favorites Yet</h2>
          <p>Start exploring pets and tap the ❤️ icon to save them!</p>
        </div>
      ) : (
        <div className="fav-grid">
          {savedPets.map((pet) => (
            <div key={pet.id} className="fav-card">
              <img src={pet.image} alt={pet.name} className="fav-card-img" />
              <h3>{pet.name}</h3>
              <p>{pet.breed}</p>
              <small>{pet.location}</small>
              <button className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
