import React from "react";
import { useNavigate } from "react-router-dom";

export default function PetListings() {
  const navigate = useNavigate();
  const pets = [
    { id: 1, name: "Bella", species: "Dog" },
    { id: 2, name: "Max", species: "Cat" },
  ];

  return (
    <div>
      <h1>Pet Listings</h1>
      {pets.map((pet) => (
        <div key={pet.id}>
          <h3>{pet.name} ({pet.species})</h3>
          <button onClick={() => navigate(`/adopt/${pet.id}`)}>View Details</button>
        </div>
      ))}
    </div>
  );
}
