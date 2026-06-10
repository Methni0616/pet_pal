import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import styles from "./VaccinationTracker.module.css";

export default function VaccinationTracker() {
  const { petId } = useParams();

  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    petName: "",
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    notes: "",
  });

  useEffect(() => {
    loadVaccinations();
  }, []);

  const loadVaccinations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vaccinations/pet/${petId}`,
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

      await axios.post("http://localhost:5000/api/vaccinations", {
        ...form,
        petId,
        status,
      });

      setForm({
        petName: "",
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
    try {
      await axios.delete(`http://localhost:5000/api/vaccinations/${id}`);

      loadVaccinations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>💉 Vaccination Tracker</h1>

      <form className={styles.form} onSubmit={addVaccination}>
        <input
          name="petName"
          placeholder="Pet Name"
          value={form.petName}
          onChange={handleChange}
          required
        />

        <input
          name="vaccineName"
          placeholder="Vaccine Name"
          value={form.vaccineName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dateGiven"
          value={form.dateGiven}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="nextDueDate"
          value={form.nextDueDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Save Vaccination</button>
      </form>

      <div className={styles.cardGrid}>
        {records.map((record) => (
          <div key={record._id} className={styles.card}>
            <h3>{record.vaccineName}</h3>

            <p>🐾 {record.petName}</p>

            <p>Given: {new Date(record.dateGiven).toLocaleDateString()}</p>

            <p>Due: {new Date(record.nextDueDate).toLocaleDateString()}</p>

            <span
              className={`${styles.status} ${
                styles[record.status.toLowerCase()]
              }`}
            >
              {record.status}
            </span>

            <button onClick={() => deleteVaccination(record._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
