import React from "react";
import { useParams } from "react-router-dom";
import "./AdoptionForm.css";

export default function AdoptionForm() {
  const { id } = useParams();

  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 years", image: "https://th.bing.com/th/id/R.21f3fa210de6e87d1714d32d8214b6f8?rik=N3BDYlK2y6Au5Q&pid=ImgRaw&r=0", vaccinations: "Rabies, Parvovirus", shelter: "Happy Paws Shelter, Colombo", description: "Bella is a playful, loving Golden Retriever who enjoys running and being with people." },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: "1.5 years", image: "https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2Fwp-image-198369%2Fb3a545e5bbb2a5bf3141ca4be6cb10d7%2FSiamese-Cat-Breed-Guide-.jpg&w=1200&q=75", vaccinations: "FVRCP, Rabies", shelter: "Whisker Haven, Kandy", description: "Max is a gentle Siamese cat who loves to nap in sunny spots and purr on your lap." },
    { id: 3, name: "Luna", species: "Dog", breed: "Beagle", age: "3 years", image: "https://th.bing.com/th/id/R.b5a89bcbee8bf091b646997c8d7c4378?rik=JiQgQJXu9XHSmQ&pid=ImgRaw&r=0", vaccinations: "Rabies, Distemper", shelter: "Paw Friends Shelter, Galle", description: "Luna is a curious Beagle with a great sense of smell and an even greater heart." },
    { id: 4, name: "Charlie", species: "Rabbit", breed: "Netherland Dwarf", age: "8 months", image: "https://image.petmd.com/files/styles/863x625/public/2023-08/netherland.dwarf_.jpg", vaccinations: "Myxomatosis, RHDV", shelter: "Bunny Haven, Negombo", description: "Charlie is a tiny bundle of joy, friendly and easy to care for." },
    { id: 5, name: "Milo", species: "Cat", breed: "Maine Coon", age: "2.5 years", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" },
    { id: 6, name: "Coco", species: "Dog", breed: "Poodle", age: "4 years", image: "https://tse4.mm.bing.net/th/id/OIP.thyo26eqrj7cvAEBfzhZ7QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 7, name: "Nibbles", species: "Hamster", breed: "Syrian", age: "6 months", image: "https://tse3.mm.bing.net/th/id/OIP.1JVCKgoh5p54HpjiEegyewHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 8, name: "Snowy", species: "Bird", breed: "Cockatoo", age: "1 year", image: "https://th.bing.com/th/id/R.70d673bfd32d2a3d439e64fe05d3f4af?rik=QMWamVGYQCbwAQ&pid=ImgRaw&r=0" },
    { id: 9, name: "Rocky", species: "Dog", breed: "German Shepherd", age: "5 years", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16" },
    { id: 10, name: "Oliver", species: "Cat", breed: "Bengal", age: "2 years", image: "https://tse1.mm.bing.net/th/id/OIP.zq-Fem02l2uLcQBgmel2kwHaFO?rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  const pet = pets.find((p) => p.id === parseInt(id));

  if (!pet) {
    return <h2 className="not-found">Pet not found 🐾</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your adoption request for " + pet.name + " has been submitted!");
  };

  return (
    <div className="adoption-container">
      <div className="pet-info">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <div className="pet-details">
          <h2>{pet.name}</h2>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          {pet.vaccinations && <p><strong>Vaccinations:</strong> {pet.vaccinations}</p>}
          {pet.shelter && <p><strong>Shelter:</strong> {pet.shelter}</p>}
          {pet.description && <p className="pet-desc">{pet.description}</p>}
        </div>
      </div>

      <form className="adoption-form" onSubmit={handleSubmit}>
        <h3>Adopt {pet.name}</h3>
        <input type="text" placeholder="Your Full Name" required />
        <input type="email" placeholder="Your Email Address" required />
        <input type="text" placeholder="Contact Number" required />
        <textarea placeholder="Why do you want to adopt this pet?" required></textarea>
        <button type="submit">Submit Adoption Request</button>
      </form>
    </div>
  );
}

