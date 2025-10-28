import React from "react";
import { useNavigate } from "react-router-dom";
import "./PetListings.css"; // You can create this file for styling

export default function PetListings() {
  const navigate = useNavigate();

  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 years", image: "https://images.unsplash.com/photo-1507149833265-60c372daea22" },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: "1.5 years", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131" },
    { id: 3, name: "Luna", species: "Dog", breed: "Beagle", age: "3 years", image: "https://images.unsplash.com/photo-1507149833265-60c372daea22" },
    { id: 4, name: "Charlie", species: "Rabbit", breed: "Netherland Dwarf", age: "8 months", image: "https://images.unsplash.com/photo-1612817159949-1e4e4e31d68a" },
    { id: 5, name: "Milo", species: "Cat", breed: "Maine Coon", age: "2.5 years", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" },
    { id: 6, name: "Coco", species: "Dog", breed: "Poodle", age: "4 years", image: "https://images.unsplash.com/photo-1557970877-1b1f4e0b84a6" },
    { id: 7, name: "Nibbles", species: "Hamster", breed: "Syrian", age: "6 months", image: "https://images.unsplash.com/photo-1583337130417-3346a1af0b9e" },
    { id: 8, name: "Snowy", species: "Bird", breed: "Cockatoo", age: "1 year", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  ];

  return (
    <div className="pet-listings-page">
      <h1 className="pet-listings-title">🐾 Available Pets for Adoption</h1>
      <div className="pet-grid">
        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <img src={pet.image} alt={pet.name} className="pet-image" />
            <h3>{pet.name}</h3>
            <p className="pet-info">
              {pet.species} • {pet.breed} • {pet.age}
            </p>
            <button
              className="view-btn"
              onClick={() => navigate(`/adopt/${pet.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

