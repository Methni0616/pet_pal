import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import styles from "./WeightTracker.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeightTracker() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);

  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    weight: "",
    recordDate: "",
    notes: "",
  });

  useEffect(() => {
    loadPet();
    loadRecords();
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

  const loadRecords = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/weights/pet/${petId}`
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

  const addWeight = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/weights",
        {
          petId,
          petName: pet.name,
          weight: form.weight,
          recordDate: form.recordDate,
          notes: form.notes,
        }
      );

      setForm({
        weight: "",
        recordDate: "",
        notes: "",
      });

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    if (
      !window.confirm(
        "Delete this weight record?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/weights/${id}`
      );

      loadRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: records.map((r) =>
      new Date(
        r.recordDate
      ).toLocaleDateString()
    ),

    datasets: [
      {
        label: "Weight (kg)",
        data: records.map((r) => r.weight),
        borderColor: "#db6027",
        backgroundColor: "#ec8f48",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>⚖️ Weight Tracker</h1>

      {pet && (
        <div className={styles.petHeader}>
          <img
            src={pet.image}
            alt={pet.name}
            className={styles.petImage}
          />

          <div>
            <h2>{pet.name}</h2>

            <p>{pet.species}</p>

            <p>{pet.breed}</p>
          </div>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={addWeight}
      >
        <input
          value={pet?.name || ""}
          disabled
        />

        <input
          type="number"
          step="0.1"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="recordDate"
          value={form.recordDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          Save Weight
        </button>
      </form>

      <div className={styles.chartCard}>
        <Line data={chartData} />
      </div>

      <div className={styles.cardGrid}>
        {records.map((record) => (
          <div
            key={record._id}
            className={styles.card}
          >
            <h3>{record.weight} kg</h3>

            <p>
              📅{" "}
              {new Date(
                record.recordDate
              ).toLocaleDateString()}
            </p>

            <p>
              📝{" "}
              {record.notes ||
                "No notes"}
            </p>

            <button
              onClick={() =>
                deleteRecord(record._id)
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