import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import styles from "./VetVisitTracker.module.css";

export default function VetVisitTracker() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);

  const [visits, setVisits] =
    useState([]);

  const [form, setForm] = useState({
    vetName: "",
    clinicName: "",
    visitDate: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  useEffect(() => {
    loadPet();
    loadVisits();
  }, [petId]);

  const loadPet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pets/${petId}`
      );

      setPet(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadVisits = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vet-visits/pet/${petId}`
      );

      setVisits(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const addVisit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/vet-visits",
        {
          petId,
          petName: pet.name,
          ...form,
        }
      );

      setForm({
        vetName: "",
        clinicName: "",
        visitDate: "",
        diagnosis: "",
        treatment: "",
        notes: "",
      });

      loadVisits();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVisit = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/vet-visits/${id}`
      );

      loadVisits();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>🏥 Vet Visit Tracker</h1>

      {pet && (
        <div className={styles.petHeader}>
          <img
            src={pet.image}
            alt={pet.name}
            className={styles.petImage}
          />

          <div>
            <h2>{pet.name}</h2>

            <p>
              <strong>Species:</strong>{" "}
              {pet.species}
            </p>

            <p>
              <strong>Breed:</strong>{" "}
              {pet.breed}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {pet.age}
            </p>
          </div>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={addVisit}
      >
        <input
          value={pet?.name || ""}
          disabled
        />

        <input
          name="vetName"
          placeholder="Veterinarian Name"
          value={form.vetName}
          onChange={handleChange}
          required
        />

        <input
          name="clinicName"
          placeholder="Clinic Name"
          value={form.clinicName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="visitDate"
          value={form.visitDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          required
        />

        <textarea
          name="treatment"
          placeholder="Treatment"
          value={form.treatment}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Save Vet Visit
        </button>
      </form>

      <div className={styles.cardGrid}>
        {visits.map((visit) => (
          <div
            key={visit._id}
            className={styles.card}
          >
            <h3>
              👨‍⚕️ {visit.vetName}
            </h3>

            <p>
              🏥 {visit.clinicName}
            </p>

            <p>
              📅{" "}
              {new Date(
                visit.visitDate
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>
                Diagnosis:
              </strong>{" "}
              {visit.diagnosis}
            </p>

            <p>
              <strong>
                Treatment:
              </strong>{" "}
              {visit.treatment}
            </p>

            <p>
              📝{" "}
              {visit.notes ||
                "No notes"}
            </p>

            <button
              onClick={() =>
                deleteVisit(
                  visit._id
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}