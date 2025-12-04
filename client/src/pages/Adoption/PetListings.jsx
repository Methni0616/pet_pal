import React from "react";
import { useNavigate } from "react-router-dom";
import "./PetListings.css";

export default function PetListings() {
  const navigate = useNavigate();

    // Save pet to favorites in localStorage
  const addToFavorites = (pet) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];

    // Prevent duplicates
    const alreadySaved = existing.some((item) => item.id === pet.id);
    if (!alreadySaved) {
      existing.push(pet);
      localStorage.setItem("favorites", JSON.stringify(existing));
      alert(`${pet.name} added to favorites ❤️`);
    } else {
      alert(`${pet.name} is already in favorites!`);
    }
  };

  const pets = [
    { id: 1, name: "Bella", species: "Dog", breed: "Golden Retriever", age: "2 years", image: "https://th.bing.com/th/id/R.21f3fa210de6e87d1714d32d8214b6f8?rik=N3BDYlK2y6Au5Q&pid=ImgRaw&r=0" },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: "1.5 years", image: "https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2Fwp-image-198369%2Fb3a545e5bbb2a5bf3141ca4be6cb10d7%2FSiamese-Cat-Breed-Guide-.jpg&w=1200&q=75" },
    { id: 3, name: "Luna", species: "Dog", breed: "Beagle", age: "3 years", image: "https://th.bing.com/th/id/R.b5a89bcbee8bf091b646997c8d7c4378?rik=JiQgQJXu9XHSmQ&pid=ImgRaw&r=0" },
    { id: 4, name: "Charlie", species: "Rabbit", breed: "Netherland Dwarf", age: "8 months", image: "https://th.bing.com/th/id/OIP.cwIRRgyZUp8IBA9M5MXVswHaGl?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 5, name: "Milo", species: "Cat", breed: "Maine Coon", age: "2.5 years", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" },
    { id: 6, name: "Coco", species: "Dog", breed: "Poodle", age: "4 years", image: "https://tse4.mm.bing.net/th/id/OIP.thyo26eqrj7cvAEBfzhZ7QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 7, name: "Nibbles", species: "Hamster", breed: "Syrian", age: "6 months", image: "https://tse3.mm.bing.net/th/id/OIP.1JVCKgoh5p54HpjiEegyewHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 8, name: "Snowy", species: "Bird", breed: "Cockatoo", age: "1 year", image: "https://th.bing.com/th/id/R.70d673bfd32d2a3d439e64fe05d3f4af?rik=QMWamVGYQCbwAQ&pid=ImgRaw&r=0" },
    { id: 9, name: "Rocky", species: "Dog", breed: "German Shepherd", age: "5 years", image: "https://images.unsplash.com/photo-1558788353-f76d92427f16" },
    { id: 10, name: "Oliver", species: "Cat", breed: "Bengal", age: "2 years", image: "https://tse1.mm.bing.net/th/id/OIP.zq-Fem02l2uLcQBgmel2kwHaFO?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 11, name: "Buddy", species: "Dog", breed: "Labrador Retriever", age: "3.5 years", image: "https://www.itl.cat/pngfile/big/111-1118405_labrador-retriever-dog-hd-wallpapers-labrador-dog.jpg" },
    { id: 12, name: "Chirpy", species: "Bird", breed: "Parakeet", age: "10 months", image: "https://tse1.mm.bing.net/th/id/OIP.Gn607i1fZf7Q2fORzs0sQAHaEy?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 13, name: "Hazel", species: "Rabbit", breed: "Lionhead", age: "1.2 years", image: "https://th.bing.com/th/id/R.f7884c7a1fc231a18c989696be586a2e?rik=zLNMqKTE9f8HdQ&pid=ImgRaw&r=0" },
    { id: 14, name: "Pumpkin", species: "Cat", breed: "Persian", age: "4 years", image: "https://fishsubsidy.org/wp-content/uploads/2020/02/persian-cat1.jpg" },
    { id: 15, name: "Ziggy", species: "Dog", breed: "Husky", age: "2.8 years", image: "https://tse3.mm.bing.net/th/id/OIP.IitgyH10SCQXv6SA2slRGQHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 16, name: "Peanut", species: "Hamster", breed: "Dwarf", age: "5 months", image: "https://tse4.mm.bing.net/th/id/OIP.iw-pj4A5EcWYR-uLryiPIgHaFS?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 17, name: "Kiwi", species: "Bird", breed: "Lovebird", age: "7 months", image: "https://th.bing.com/th/id/R.4279467d574d1638ce281f8c7f1e1ae2?rik=NJU4JGGy62eKEw&pid=ImgRaw&r=0" },
    { id: 18, name: "Toby", species: "Dog", breed: "Bulldog", age: "4.5 years", image: "https://th.bing.com/th/id/R.104d62b8aae9000dd82e4eccd42b63fd?rik=kZxa1JKjksYFYQ&pid=ImgRaw&r=0" },
    { id: 19, name: "Misty", species: "Cat", breed: "Ragdoll", age: "2 years", image: "https://th.bing.com/th/id/R.583a94499579b1adfeed9d28dc05eb75?rik=QUPo9taKXZzucw&pid=ImgRaw&r=0" },
    { id: 20, name: "Bubbles", species: "Fish", breed: "Betta", age: "1 year", image: "https://tse1.mm.bing.net/th/id/OIP.aV6t735oWVwTf3FpRdy_3QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" }
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
            <div className="btn-row">
              <button
                className="view-btn"
                onClick={() => navigate(`/adopt/${pet.id}`)}
              >
                View Details
              </button>

              <button
                className="fav-btn"
                onClick={() => addToFavorites(pet)}
              >
                ❤️ Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

