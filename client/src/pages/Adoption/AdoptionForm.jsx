import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AdoptionForm.module.css";

export default function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.error("Error loading pet:", err);
      });
  }, [id]);

  if (!pet) {
    return (
      <div className={styles.notFound}>
        <h2>Loading Pet...</h2>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      petId: pet._id,
      petName: pet.name,
      species: pet.species,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };

    const existing =
      JSON.parse(localStorage.getItem("myAdoptions")) || [];

    existing.push(formData);

    localStorage.setItem(
      "myAdoptions",
      JSON.stringify(existing)
    );

    alert(`Adoption request submitted for ${pet.name}!`);

    navigate("/my-adoptions");
  };

  return (
    <div className={styles.adoptionContainer}>
      <div className={styles.petInfo}>
        <img
          src={
            pet.image ||
            "https://images.unsplash.com/photo-1517849845537-4d257902454a"
          }
          alt={pet.name}
          className={styles.petImage}
        />

        <div className={styles.petDetails}>
          <h2>{pet.name}</h2>

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
        </div>
      </div>

      <form
        className={styles.adoptionForm}
        onSubmit={handleSubmit}
      >
        <h3>Adopt {pet.name}</h3>

        <input
          type="text"
          placeholder="Your Full Name"
          required
        />

        <input
          type="email"
          placeholder="Your Email Address"
          required
        />

        <input
          type="text"
          placeholder="Contact Number"
          required
        />

        <textarea
          placeholder="Why do you want to adopt this pet?"
          required
        />

        <button type="submit">
          Submit Adoption Request
        </button>
      </form>
    </div>
  );
}