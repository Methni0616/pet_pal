import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import styles from "./FeedingTracker.module.css";

export default function FeedingTracker() {
  const { petId } = useParams();

  const [pet, setPet] = useState(null);

  const [records, setRecords] =
    useState([]);

  const [form, setForm] = useState({
    foodName: "",
    mealType: "Breakfast",
    quantity: "",
    feedingDate: "",
    notes: "",
  });

  useEffect(() => {
    loadPet();
    loadFeedings();
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

  const loadFeedings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/feedings/pet/${petId}`
      );

      setRecords(res.data);
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

  const addRecord = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/feedings",
        {
          petId,
          petName: pet.name,
          ...form,
        }
      );

      setForm({
        foodName: "",
        mealType: "Breakfast",
        quantity: "",
        feedingDate: "",
        notes: "",
      });

      loadFeedings();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    if (
      !window.confirm(
        "Delete feeding record?"
      )
    )
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/feedings/${id}`
      );

      loadFeedings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>🍽 Feeding Tracker</h1>

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
        onSubmit={addRecord}
      >
        <input
          value={pet?.name || ""}
          disabled
        />

        <input
          name="foodName"
          placeholder="Food Name"
          value={form.foodName}
          onChange={handleChange}
          required
        />

        <select
          name="mealType"
          value={form.mealType}
          onChange={handleChange}
        >
          <option>
            Breakfast
          </option>

          <option>
            Lunch
          </option>

          <option>
            Dinner
          </option>

          <option>
            Snack
          </option>
        </select>

        <input
          name="quantity"
          placeholder="Quantity (100g / 1 Cup)"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="feedingDate"
          value={form.feedingDate}
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
          Save Feeding Record
        </button>
      </form>

      <div className={styles.cardGrid}>
        {records.length === 0 ? (
          <p className={styles.empty}>
            No feeding records found.
          </p>
        ) : (
          records.map((record) => (
            <div
              key={record._id}
              className={styles.card}
            >
              <h3>
                🍖 {record.foodName}
              </h3>

              <p>
                Meal:
                {" "}
                {record.mealType}
              </p>

              <p>
                Quantity:
                {" "}
                {record.quantity}
              </p>

              <p>
                Date:
                {" "}
                {new Date(
                  record.feedingDate
                ).toLocaleDateString()}
              </p>

              <p>
                Notes:
                {" "}
                {record.notes ||
                  "No notes"}
              </p>

              <button
                onClick={() =>
                  deleteRecord(
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