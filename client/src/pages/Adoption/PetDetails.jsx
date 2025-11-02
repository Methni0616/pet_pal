import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PetDetails.css";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 years", image: "https://th.bing.com/th/id/R.21f3fa210de6e87d1714d32d8214b6f8?rik=N3BDYlK2y6Au5Q&pid=ImgRaw&r=0", vaccinations: "Rabies, Parvovirus", shelter: "Happy Paws Shelter, Colombo", description: "Bella is a playful, loving Golden Retriever who enjoys running and being with people." },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: "1.5 years", image: "https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2Fwp-image-198369%2Fb3a545e5bbb2a5bf3141ca4be6cb10d7%2FSiamese-Cat-Breed-Guide-.jpg&w=1200&q=75", vaccinations: "FVRCP, Rabies", shelter: "Whisker Haven, Kandy", description: "Max is a gentle Siamese cat who loves to nap in sunny spots and purr on your lap." },
    { id: 3, name: "Luna", species: "Dog", breed: "Beagle", age: "3 years", image: "https://th.bing.com/th/id/R.b5a89bcbee8bf091b646997c8d7c4378?rik=JiQgQJXu9XHSmQ&pid=ImgRaw&r=0", vaccinations: "Rabies, Distemper", shelter: "Paw Friends Shelter, Galle", description: "Luna is a curious Beagle with a great sense of smell and an even greater heart." },
    { id: 4, name: "Charlie", species: "Rabbit", breed: "Netherland Dwarf", age: "8 months", image: "https://image.petmd.com/files/styles/863x625/public/2023-08/netherland.dwarf_.jpg", vaccinations: "Myxomatosis, RHDV", shelter: "Bunny Haven, Negombo", description: "Charlie is a tiny bundle of joy, friendly and easy to care for." },
    // ...you can include more pets from your listings
  ];

  const pet = pets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="not-found">
        <h2>Pet not found 🐾</h2>
        <button onClick={() => navigate("/")}>Back to Listings</button>
      </div>
    );
  }

  return (
    <div className="pet-details-container">
      <div className="pet-details-card">
        <img src={pet.image} alt={pet.name} className="pet-details-image" />
        <div className="pet-details-info">
          <h1>{pet.name}</h1>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Vaccinations:</strong> {pet.vaccinations}</p>
          <p><strong>Shelter:</strong> {pet.shelter}</p>
          <p className="pet-details-description">{pet.description}</p>

          <div className="pet-details-buttons">
            <button className="adopt-btn" onClick={() => navigate(`/adoption-form/${id}`)}>
              🐶 Apply for Adoption
            </button>
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

