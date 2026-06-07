import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PetDetails.css";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Pet load error:", err);
        setError("Pet not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="not-found">
        <h2>Loading Pet...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="not-found">
        <h2>{error}</h2>
        <button onClick={() => navigate("/adopt")}>
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="pet-details-container">
      <div className="pet-details-card">
        <img
          src={
            pet.image ||
            "https://images.unsplash.com/photo-1517849845537-4d257902454a"
          }
          alt={pet.name}
          className="pet-details-image"
        />

        <div className="pet-details-info">
          <h1>{pet.name}</h1>

          <p>
            <strong>Species:</strong>{" "}
            {pet.species || "Pet"}
          </p>

          <p>
            <strong>Breed:</strong> {pet.breed}
          </p>

          <p>
            <strong>Age:</strong> {pet.age}
          </p>

          <p>
            <strong>Gender:</strong> {pet.gender}
          </p>

          <div className="pet-details-buttons">
            <button
              className="adopt-btn"
              onClick={() =>
                navigate(`/adoption-form/${pet._id}`)
              }
            >
              🐶 Apply for Adoption
            </button>

            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back to Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}