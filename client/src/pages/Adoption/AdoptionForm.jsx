import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AdoptionForm.module.css";

export default function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/adoptions",
        {
          petId: pet._id,
          petName: pet.name,
          species: pet.species,

          applicantName: name,
          email,
          contact,
          reason,

          status: "Pending",
        }
      );

      alert("Adoption request submitted!");

      navigate("/my-adoptions");
    } catch (error) {
      console.error(error);

      alert("Submission failed");
    }
  };

  if (!pet) {
    return (
      <div className={styles.notFound}>
        <h2>Loading Pet...</h2>
      </div>
    );
  }

  return (
    <div className={styles.adoptionContainer}>
      <div className={styles.petInfo}>
        <img
          src={pet.image}
          alt={pet.name}
          className={styles.petImage}
        />

        <div className={styles.petDetails}>
          <h2>{pet.name}</h2>

          <p>
            <strong>Species:</strong> {pet.species}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <textarea
          placeholder="Why do you want to adopt this pet?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button type="submit">
          Submit Adoption Request
        </button>
      </form>
    </div>
  );
}