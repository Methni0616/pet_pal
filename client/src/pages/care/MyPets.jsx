import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyPets.css";

export default function MyPets() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pets");
      setPets(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mypets-container">
      <h1>🐾 My Pets</h1>

      <p>
        Manage your pets and access their health records,
        reminders, activities and gallery.
      </p>

      <div className="care-buttons">
        <button onClick={() => navigate("/care/add")}>
          ➕ Add a Pet
        </button>
      </div>

      <div className="pets-list">
        {loading ? (
          <p>Loading pets...</p>
        ) : pets.length === 0 ? (
          <p className="no-pets">
            No pets found. Add your first pet 🐾
          </p>
        ) : (
          pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img
                src={pet.image}
                alt={pet.name}
                className="pet-image"
              />

              <h3>{pet.name}</h3>

              <p>
                <strong>Species:</strong> {pet.species}
              </p>

              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>

              <p>
                <strong>Age:</strong> {pet.age}
              </p>

              <button
                onClick={() =>
                  navigate(`/care/profile/${pet._id}`)
                }
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}