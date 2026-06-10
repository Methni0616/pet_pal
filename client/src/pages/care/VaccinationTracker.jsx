import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./VaccinationTracker.module.css";

export default function VaccinationTracker() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    notes: "",
  });

  useEffect(() => {
    loadPet();
    loadVaccinations();
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

  const loadVaccinations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vaccinations/pet/${petId}`
      );

      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addVaccination = async (e) => {
    e.preventDefault();

    try {
      const today = new Date();
      const due = new Date(form.nextDueDate);

      let status = "Completed";

      if (due > today) {
        status = "Upcoming";
      }

      await axios.post(
        "http://localhost:5000/api/vaccinations",
        {
          petId,
          petName: pet.name,
          vaccineName: form.vaccineName,
          dateGiven: form.dateGiven,
          nextDueDate: form.nextDueDate,
          notes: form.notes,
          status,
        }
      );

      setForm({
        vaccineName: "",
        dateGiven: "",
        nextDueDate: "",
        notes: "",
      });

      loadVaccinations();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVaccination = async (id) => {
    if (
      !window.confirm(
        "Delete this vaccination record?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/vaccinations/${id}`
      );

      loadVaccinations();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id,
    currentStatus
  ) => {
    try {
      const newStatus =
        currentStatus === "Completed"
          ? "Upcoming"
          : "Completed";

      await axios.put(
        `http://localhost:5000/api/vaccinations/${id}/status`,
        {
          status: newStatus,
        }
      );

      loadVaccinations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>💉 Vaccination Tracker</h1>

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
        onSubmit={addVaccination}
      >
        <input
          value={pet?.name || ""}
          disabled
          className={styles.readOnlyInput}
        />

        <input
          name="vaccineName"
          placeholder="Vaccine Name"
          value={form.vaccineName}
          onChange={handleChange}
          required
        />

        <div className={styles.inputGroup}>
          <label>
            📅 Vaccination Date
          </label>

          <input
            type="date"
            name="dateGiven"
            value={form.dateGiven}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>
            ⏰ Next Due Date
          </label>

          <input
            type="date"
            name="nextDueDate"
            value={form.nextDueDate}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button
          type="submit"
          className={styles.saveBtn}
        >
          Save Vaccination
        </button>
      </form>

      <div className={styles.cardGrid}>
        {records.length === 0 ? (
          <p className={styles.empty}>
            No vaccination records found.
          </p>
        ) : (
          records.map((record) => (
            <div
              key={record._id}
              className={styles.card}
            >
              <div
                className={styles.cardContent}
              >
                <h3>
                  {record.vaccineName}
                </h3>

                <p>
                  📅 Given:{" "}
                  {new Date(
                    record.dateGiven
                  ).toLocaleDateString()}
                </p>

                <p>
                  ⏰ Due:{" "}
                  {new Date(
                    record.nextDueDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  📝{" "}
                  {record.notes ||
                    "No additional notes"}
                </p>
              </div>

              <button
                className={
                  record.status ===
                  "Completed"
                    ? styles.completedBtn
                    : styles.upcomingBtn
                }
                onClick={() =>
                  updateStatus(
                    record._id,
                    record.status
                  )
                }
              >
                {record.status}
              </button>

              <button
                className={
                  styles.deleteBtn
                }
                onClick={() =>
                  deleteVaccination(
                    record._id
                  )
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}