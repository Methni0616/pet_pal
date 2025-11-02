import React from "react";
import { useNavigate } from "react-router-dom";
import "./PetListings.css";

export default function PetListings() {
  const navigate = useNavigate();

  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 years", image: "https://th.bing.com/th/id/R.21f3fa210de6e87d1714d32d8214b6f8?rik=N3BDYlK2y6Au5Q&pid=ImgRaw&r=0" },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: "1.5 years", image: "https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2Fwp-image-198369%2Fb3a545e5bbb2a5bf3141ca4be6cb10d7%2FSiamese-Cat-Breed-Guide-.jpg&w=1200&q=75" },
    { id: 3, name: "Luna", species: "Dog", breed: "Beagle", age: "3 years", image: "https://th.bing.com/th/id/R.b5a89bcbee8bf091b646997c8d7c4378?rik=JiQgQJXu9XHSmQ&pid=ImgRaw&r=0" },
    { id: 4, name: "Charlie", species: "Rabbit", breed: "Netherland Dwarf", age: "8 months", image: "https://image.petmd.com/files/styles/863x625/public/2023-08/netherland.dwarf_.jpg" },
    { id: 5, name: "Milo", species: "Cat", breed: "Maine Coon", age: "2.5 years", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" },
    { id: 6, name: "Coco", species: "Dog", breed: "Poodle", age: "4 years", image: "https://tse4.mm.bing.net/th/id/OIP.thyo26eqrj7cvAEBfzhZ7QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
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

